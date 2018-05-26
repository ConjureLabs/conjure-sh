const Route = require('@conjurelabs/route')
const Queue = require('conjure-core/classes/Queue')
const AWS = require('aws-sdk')
const config = require('conjure-core/modules/config')
const { ContentError, UnexpectedError } = require('@conjurelabs/err')
const log = require('conjure-core/modules/log')('container start hook')

AWS.config.update({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey,
  region: config.aws.default.region
})

const route = new Route({
  requireAuthentication: false
})

/*
  Repos listing
 */
route.push(async (req, res) => {
  // if user is not logged in, then block access until they do so
  if (!req.isAuthenticated()) {
    return res.render('/terminal/private/requires-auth')
  }

  const { orgName, repoName, issueId } = req.params

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account
  
  // will need to check if user has perms (regardless if private or not)
  // not using our own db, will check against github directly
  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const getReposResult = await apiGetRepos(req)
  const orgRepos = getReposResult.reposByOrg[orgName]

  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call
  let orgsResult

  // if user has no repos in the containers org...
  if (!orgRepos) {
    log.info(`User does not have access to org ${orgName}`)
    orgsResult = apiGetOrgs(req)
    res.render('/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // filtering down to the container's repo record
  let repo
  for (const orgRepo of orgRepos) {
    if (orgRepo.name === repoName) {
      repo = orgRepo
      break
    }
  }

  // if that repo does not exist, kick to 404
  if (!repo) {
    log.info(`User does not have access to repo ${repoName}, within org ${orgName}`)
    orgsResult = apiGetOrgs(req)
    res.render('/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // todo: figure out perms again?
  // // if perms are not correct, kick to 404
  // // only check if have read access
  // if (!repo.permissions || repo.permissions.pull !== true) {
  //   log.info(`User does not have proper perms for repo ${repoName}, within org ${orgName}`)
  //   orgsResult = apiGetOrgs(req)
  //   res.render('/terminal/private/invalid-permissions', {
  //     account: {
  //       photo: gitHubAccount.photo // todo: not rely on github...
  //     },
  //     orgs: (await orgsResult).orgs
  //   })
  //   return
  // }

  const { query, DatabaseTable } = require('@conjurelabs/db')

  // getting our repo record, based on github repo id
  const repoRows = await DatabaseTable.select('watchedRepo', {
    serviceRepoId: repo.serviceRepoId,
    disabled: false
  })

  if (!repoRows.length) {
    log.info(`User does not have repo ${repoName}, within org ${orgName}`)
    orgsResult = apiGetOrgs(req)
    res.render('/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // getting comment row record (so we can pull the payload)
  const commentRowsResult = await query(`
    SELECT * FROM github_issue_comment
    WHERE watched_repo = $1 AND
    issue_id = $2 AND
    is_active = TRUE
    ORDER BY added, updated DESC
  `, [repoRows[0].id, issueId])
  const commentRows = commentRowsResult.rows
  if (!commentRows.length) {
    log.info(`User tried to start a container for repo ${repoName}, within org ${orgName}, issue ${issueId}, that is not in a ready state`)
    orgsResult = apiGetOrgs(req)
    res.render('/terminal/container-state/not-ready', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // pulling payload file
  const s3Obj = await getS3Object(commentRows[0].s3Key)

  const GitHubWebhookPayload = require('conjure-core/classes/Repo/GitHub/Webhook/Payload')
  const payload = new GitHubWebhookPayload(s3Obj.payload)

  const Container = require('conjure-core/classes/Container')
  const container = new Container(payload)

  let containerRecord = await container.getPendingOrActiveRecord()
  
  if (!containerRecord) {
    const { branch } = payload

    const containerRecords = await DatabaseTable.insert('container', {
      repo: repoRows[0].id,
      branch,
      isActive: false,
      creationFailed: false,
      ecsState: 'pending',
      added: new Date(),
      creationHeartbeat: new Date()
    })
    containerRecord = containerRecords[0]
  }

  // should always be true
  if (containerRecord) {
    res.cookie('conjure-container-starting', {
      id: containerRecord.id
    }, {
      maxAge: 240000, // 4 minutes
      httpOnly: true
    })
  }

  res.redirect(302, config.app.web.url)

  // res.render('/container/start', {
  //   account: {
  //     photo: gitHubAccount.photo
  //   },
  //   orgName,
  //   repoName,
  //   issueId,
  //   title: payload.title,
  //   containerState: existingContainer ? existingContainer.ecsState : 'pending'
  // })

  // begin spinning up the container
  const queue = new Queue('container.create')
  await queue.push({
    content: s3Obj.payload
  })
  log.info('Job pushed to queue (container.create)')
})

function getS3Object(key) {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      params: {
        Bucket: config.aws.s3.buckets.gitHubPayloads
      }
    })

    s3.getObject({
      Key: key
    }, (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(JSON.parse(data.Body))
    })
  })
}

module.exports = route

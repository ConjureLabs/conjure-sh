const Route = require('@conjurelabs/route')
const Queue = require('conjure-core/classes/Queue')
const AWS = require('aws-sdk')
const config = require('conjure-core/modules/config')
const { ContentError, UnexpectedError } = require('@conjurelabs/err')
const nextApp = require('../../../../../next')

AWS.config.update({
  accessKeyId: config.aws.accessKey,
  secretAccessKey: config.aws.secretKey,
  region: config.aws.default.region
})

const route = new Route({
  requireAuthentication: true
})

/*
  Repos listing
 */
route.push(async (req, res) => {
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
    nextApp.render(req, res, '/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // filtering down to the container's repo record
  let repo
  for (let i = 0; i < orgRepos.length; i++) {
    if (orgRepos[i].name === repoName) {
      repo = orgRepos[i]
      break
    }
  }

  // if that repo does not exist, kick to 404
  if (!repo) {
    log.info(`User does not have access to repo ${repoName}, within org ${orgName}`)
    orgsResult = apiGetOrgs(req)
    nextApp.render(req, res, '/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // if perms are not correct, kick to 404
  // only check if have read access
  if (!repo.permissions || repo.permissions.pull !== true) {
    log.info(`User does not have proper perms for repo ${repoName}, within org ${orgName}`)
    orgsResult = apiGetOrgs(req)
    nextApp.render(req, res, '/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // getting comment row record (so we can pull the payload)
  const { query } = require('@conjurelabs/db')
  const commentRowsResult = await query(`
    SELECT * FROM github_issue_comment
    WHERE watched_repo = $1 AND
    issue_id = $2 AND
    is_active = TRUE
    ORDER BY added, updated DESC
  `, [repo.id, issueId])
  const commentRows = commentRowsResult.rows
  if (!commentRows.length) {
    throw new UnexpectedError('Comment row record missing')
  }

  // pulling payload file
  const payload = await getS3Object(commentRows[0].s3Key)

  // begin spinning up the container
  queue = new Queue('container.create')
  await queue.push({
    content: payload
  })
  log.info('Job pushed to queue (container.create)')

  // todo: add a cookie to res, so user can see a success message after redirect
  res.redirect(302, '/') // kick to dashboard
})

function getS3Object(key) {
  return new Promise((resolve, reject) => {
    const s3 = new AWS.S3({
      params: {
        Bucket: config.aws.s3.buckets.gitHubPayloads
      }
    })

    s3.getObject({
      Key: commentRows[0].s3Key
    }, (err, data) => {
      if (err) {
        return reject(err)
      }

      resolve(JSON.parse(data.Body))
    })
  })
}

module.exports = route

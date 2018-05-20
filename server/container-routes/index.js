const log = require('conjure-core/modules/log')('container routing')
const config = require('conjure-core/modules/config')
const nextApp = require('../next')

// converting 'conjure.sh' to '\\.conjure\\.sh', to prepare it for regexp
const domainExprPart = `.${config.app.web.domain}`.replace(/\./g, '\\.')
const subdomainExpr = new RegExp(`^([\\w\\.]*)${domainExprPart}(?!\\w)`, 'i')
const containerLogsExpr = new RegExp(`^(\\w+)\\.(\\w+)${domainExprPart}(?!\\w)`, 'i')

module.exports = async (req, res, next) => {
  // if not a subdomain request, kick to next, unless www.
  const subdomainMatch = subdomainExpr.exec(req.headers.host)
  if (!subdomainMatch || subdomainMatch[1] === 'www') {
    return next()
  }

  const containerMatch = containerLogsExpr.exec(req.headers.host)
  if (!containerMatch) {
    return next()
  }

  const containerId = containerMatch[1]
  const handler = containerMatch[2]

  switch(handler) {
    case 'view':
    case 'logs':
      let result
      try {
        result = await checkPermissions(req, res, containerId, handler, next)
      } catch(err) {
        log.error(err)
        return next(err)
      }
      return

    default:
      return nextApp.render(req, res, '/_error')
  }
}

const validRequestors = {}

async function checkPermissions(req, res, uid, handler, next) {
  // if user is not logged in, then block access until they do so
  if (!req.isAuthenticated()) {
    return nextApp.render(req, res, '/terminal/private/requires-auth')
  }

  const onSuccess = containerRecord => {
    validRequestors[ req.cookies.conjure ] = true // todo: remove this tmp hack to cache valid requestors
    return require(`./${handler}.js`)(req, res, containerRecord, next)
  }

  const { DatabaseTable } = require('@conjurelabs/db')

  // pull up the container record being accessed
  let containers
  try {
    containers = await DatabaseTable.select('container', {
      urlUid: uid,
      isActive: true
    })
  } catch(err) {
    return next(err)
  }

  if (!containers.length) {
    // no proxy record found
    log.info(`No container found for uid ${uid}`)
    return nextApp.render(req, res, '/_error')
  }

  const containerRecord = containers[0]

  // check if perms already set
  if (validRequestors[ req.cookies.conjure ]) {
    return onSuccess(containerRecord)
  }

  // check permissions
  let watchedRepoRecords
  try {
    watchedRepoRecords = await DatabaseTable.select('watchedRepo', {
      id: containerRecord.repo
    })
  } catch(err) {
    return next(err)
  }

  if (!watchedRepoRecords.length) {
    // no watched repo record found - this should not happen
    log.info(`No 'watched_repo' record found for container row`)
    return nextApp.render(req, res, '/_error')
  }

  const watchedRepo = watchedRepoRecords[0]

  // if not a private repo, then skip additional checks, and allow user to proceed
  if (!watchedRepo.private) {
    return onSuccess(containerRecord)
  }

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account
  
  // must be a private repo - will need to check if user has perms
  // not using our own db, will check against github directly
  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const getReposResult = await apiGetRepos(req)
  const orgRepos = getReposResult.reposByOrg[ watchedRepo.org ]

  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call
  let orgsResult

  // if user has no repos in the containers org...
  if (!orgRepos) {
    log.info(`Restricted access of container '${uid}', within org ${watchedRepo.org} - user does not have access to org`)
    orgsResult = apiGetOrgs(req)
    nextApp.render(req, res, '/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  const watchedRepoServiceRepoId = '' + parseInt(watchedRepo.serviceRepoId, 10)

  // filtering down to the container's repo record
  let repo
  for (let i = 0; i < orgRepos.length; i++) {
    if (orgRepos[i].serviceRepoId === watchedRepoServiceRepoId) {
      repo = orgRepos[i]
      break
    }
  }

  // if that repo does not exist, kick to 404
  if (!repo) {
    log.info(`Restricted access of container '${uid}', within org ${watchedRepo.org} - user does not have access to repo`)
    orgsResult = apiGetOrgs(req)
    nextApp.render(req, res, '/terminal/private/invalid-permissions', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs: (await orgsResult).orgs
    })
    return
  }

  // // if perms are not correct, kick to 404
  // // only check if have read access
  // if (!repo.permissions || repo.permissions.pull !== true) {
  //   log.info(`Restricted access of container '${uid}', within org ${watchedRepo.org} - user does not have proper perms`)
  //   orgsResult = apiGetOrgs(req)
  //   nextApp.render(req, res, '/terminal/private/invalid-permissions', {
  //     account: {
  //       photo: gitHubAccount.photo // todo: not rely on github...
  //     },
  //     orgs: (await orgsResult).orgs
  //   })
  //   return
  // }

  onSuccess(containerRecord)
}

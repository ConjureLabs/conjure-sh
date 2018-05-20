const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return nextApp.render(req, res, '/_error')
  }
})

route.push(async (req, res, next) => {
  const orgSelected = req.query.org

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = await apiGetAccountGitHub(req)

  // get repos currently watching
  const apiWatchedSummary = require('conjure-api/server/routes/api/watched/summary/get.js').call
  const watchedSummary = await apiWatchedSummary(req)
  const { watched } = watchedSummary

  // get all repos for given org/username
  const apiGetRepos = require('conjure-api/server/routes/api/org/$orgName/repos/get.js').call
  const filter = !orgSelected ? {} : {
    orgName: orgSelected
  }
  const reposResult = await apiGetRepos(req, {}, filter)

  if (!reposResult || !reposResult.reposByOrg) {
    return next()
  }

  const repos = orgSelected ? reposResult.reposByOrg[orgSelected] : Object.keys(reposResult.reposByOrg).reduce((allRepos, orgName) => {
    allRepos.push(...reposResult.reposByOrg[orgName])
    return allRepos
  }, [])
  if (!repos.length) {
    // should not happen, if we display the "+ add more" link correctly
    return next()
  }

  nextApp.render(req, res, '/watch/repos', {
    account: {
      photo: accountGitHubResult.account.photo
    },
    repos,
    withOrgLabel: !orgSelected,
    watchedRepos: watched.repos.map(repo => repo.name)
  })
})

module.exports = route

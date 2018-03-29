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

  if (!orgSelected) {
    return next()
  }

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = await apiGetAccountGitHub(req)

  // get repos currently watching
  const apiWatchedSummary = require('conjure-api/server/routes/api/watched/summary/get.js').call
  const watchedSummary = await apiWatchedSummary(req)
  const { watched } = watchedSummary

  // get all repos
  let reposResult
  if (orgSelected === accountGitHubResult.account.username) {
    const apiGetRepos = require('conjure-api/server/routes/api/account/repos/get.js').call
    reposResult = await apiGetRepos(req)
  } else {
    const apiGetRepos = require('conjure-api/server/routes/api/org/$orgName/repos/get.js').call
    reposResult = await apiGetRepos(req, {}, {
      orgName: orgSelected
    })
  }

  if (!reposResult || !Array.isArray(reposResult[orgSelected]) || !reposResult[orgSelected].length) {
    return next()
  }

  nextApp.render(req, res, '/watch/repos', {
    account: {
      photo: accountGitHubResult.account.photo
    },
    repos: reposResult[orgSelected],
    watchedRepos: watched.repos.map(repo => repo.name)
  })
})

module.exports = route

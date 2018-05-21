const Route = require('@conjurelabs/route')
const nextApp = require('../../next')

const route = new Route({
  requireAuthentication: true,
  wildcard: true,
  skippedHandler: (req, res) => {
    return nextApp.render(req, res, '/_error')
  }
})

// ensure user has repos (could have authed, not installed, and killed session before returning)
route.push(async (req, res, next) => {
  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const reposResult = (await apiGetRepos(req)).reposByOrg

  for (const org in reposResult) {
    if (reposResult[org].length) {
      return next()
    }
  }
  res.redirect(302, '/logout')
})

module.exports = route

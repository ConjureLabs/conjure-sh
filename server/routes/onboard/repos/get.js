const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return nextApp.render(req, res, '/_error')
  }
})

route.push(async (req, res) => {
  const { DatabaseTable } = require('@conjurelabs/db')
  const account = new DatabaseTable('account')
  const accountRows = await account.select({
    id: req.user.id
  })

  // record does not exist in our db - force logout
  if (!accountRows.length) {
    return res.redirect(302, '/logout')
  }

  // if already onboarded, then user should not be on this view
  if (accountRows[0].onboarded === true) {
    return res.redirect(302, '/')
  }

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = apiGetAccountGitHub(req)

  // get repos
  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const reposResult = (await apiGetRepos(req)).reposByOrg

  nextApp.render(req, res, '/onboard/repos', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    repos: reposResult
  })
})

module.exports = route

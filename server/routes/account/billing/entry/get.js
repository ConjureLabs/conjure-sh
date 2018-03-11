const Route = require('@conjurelabs/route')
const nextApp = require('../../../../next')

const route = new Route({
  requireAuthentication: true
})

/*
  Repos listing
 */
route.push(async (req, res) => {
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account

  return nextApp.render(req, res, '/account/billing/entry', {
    account: {
      photo: gitHubAccount.photo // todo: not rely on github...
    }
  })
})

module.exports = route

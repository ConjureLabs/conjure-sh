const Route = require('@conjurelabs/route')

const route = new Route({
  requireAuthentication: true
})

/*
  Repos listing
 */
route.push(async (req, res) => {
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account

  res.render('/account/payment/entry', {
    account: {
      photo: gitHubAccount.photo // todo: not rely on github...
    }
  })
})

module.exports = route

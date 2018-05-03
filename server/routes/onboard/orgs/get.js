const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return nextApp.render(req, res, '/_error')
  }
})

route.push(async (req, res) => {
  // check if account is valid, and should be seeing onboard flow
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

  if (
    req.cookies &&
    req.cookies['conjure-onboard-orgs'] &&
    req.cookies['conjure-onboard-orgs'].label &&
    req.cookies['conjure-onboard-orgs'].value
  ) {
    return res.redirect(302, '/onboard/payment')
  }

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = apiGetAccountGitHub(req)

  // get orgs
  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call
  const orgsResult = apiGetOrgs(req)

  nextApp.render(req, res, '/onboard/orgs', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    orgs: (await orgsResult).orgs
  })
})

module.exports = route

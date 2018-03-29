const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return nextApp.render(req, res, '/_error')
  }
})

route.push(async (req, res) => {
  const DatabaseTable = require('@conjurelabs/db/table')
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

  // verify cookie from orgs onboard set
  if (
    !req.cookies ||
    !req.cookies['conjure-onboard-orgs'] ||
    !req.cookies['conjure-onboard-orgs'].label ||
    !req.cookies['conjure-onboard-orgs'].value
  ) {
    return res.redirect(302, '/onboard/orgs')
  }

  // checking if a plan already exists, for this user
  const AccountMonthlyBillingPlan = new DatabaseTable('account_monthly_billing_plan')
  const planRows = await AccountMonthlyBillingPlan.select({
    account: req.user.id
  })

  if (planRows.length === 0) {
    return res.redirect(302, '/onboard/billing')
  }

  // customer credit card should exist
  const AccountCard = new DatabaseTable('account_card')
  const cardRows = await AccountCard.select({
    account: req.user.id
  })

  if (cardRows.length === 0) {
    return res.redirect(302, '/onboard/billing')
  }

  // get github account record
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = apiGetAccountGitHub(req)

  // get repos
  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const reposResult = apiGetRepos(req)

  nextApp.render(req, res, '/onboard/repos', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    repos: (await reposResult).reposByOrg,
    org: req.cookies['conjure-onboard-orgs']
  })
})

module.exports = route

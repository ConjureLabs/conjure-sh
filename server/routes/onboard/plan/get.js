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

  if (
    !req.cookies ||
    !req.cookies['conjure-onboard-orgs'] ||
    !req.cookies['conjure-onboard-orgs'].label ||
    !req.cookies['conjure-onboard-orgs'].value
  ) {
    return res.redirect(302, '/onboard/orgs')
  }

  // checking if a plan exists, for this org
  const GithubOrgMonthlyBillingPlan = new DatabaseTable('githubOrgMonthlyBillingPlan')
  const planRows = await GithubOrgMonthlyBillingPlan.select({
    org: req.cookies['conjure-onboard-orgs'].label
  })

  if (planRows.length > 0) {
    return res.redirect(302, '/onboard/billing')
  }

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account

  nextApp.render(req, res, '/onboard/plan', {
    account: {
      photo: gitHubAccount.photo
    }
  })
})

module.exports = route
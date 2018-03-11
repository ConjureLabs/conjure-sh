const Route = require('@conjurelabs/route')
const nextApp = require('../../next')

const route = new Route({
  requireAuthentication: true,
  skippedHandler: (req, res) => {
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

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = apiGetAccountGitHub(req)

  const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').call
  const { orgs } = await apiGetOrgs(req)

  // checking if any orgs user has access to are already listening to changes
  // and that the user has access to at least one repo within that org
  const batchAll = require('@conjurelabs/utils/Promise/batch-all')
  const watchedRepoResults = await batchAll(4, orgs, org => {
    const { query } = require('@conjurelabs/db')
    return query('SELECT COUNT(*) num FROM watched_repo WHERE org = $1', [org.login])
  })

  const repoChecks = orgs.reduce((mapping, org, i) => {
    const result = watchedRepoResults[i]

    mapping[org.login] = (
      Array.isArray(result.rows) &&
      result.rows.length &&
      parseInt(result.rows[0].num, 10) > 0
    )

    return mapping
  }, {})

  const orgsAlreadyAvailable = Object.values(repoChecks).filter(bool => bool === true)

  // if this account has no access to any listened repo, they must start full onboarding
  if (orgsAlreadyAvailable.length === 0) {
    return res.redirect(302, '/onboard/orgs')
  }

  // continue to partial onboarding
  return nextApp.render(req, res, '/onboard/overlap', {
    account: {
      photo: (await accountGitHubResult).account.photo
    },
    orgs,
    orgsAlreadyAvailable
  })
})

module.exports = route

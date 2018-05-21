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
  const { DatabaseTable, query } = require('@conjurelabs/db')

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

  // first getting user's own repos we recorded
  const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const { reposByOrg } = await apiGetRepos(req)
  const accountRepoIds = Object.keys(reposByOrg).reduce((all, orgName) => {
    const orgRepoIds = reposByOrg[orgName].map(repo => repo.serviceRepoId)
    all.push(...orgRepoIds)
    return all
  }, [])

  let orgsAlreadyAvailable = []
  let accountRepoIdsChunk
  while ((accountRepoIdsChunk = accountRepoIds.splice(0, 100))) {
    if (!accountRepoIdsChunk.length) {
      break
    }

    const idsPlaceholder = accountRepoIdsChunk.map((_, index) => `$${index + 1}`).join(', ')
    const existingResult = await query(`SELECT DISTINCT org FROM watched_repo WHERE service_repo_id IN (${idsPlaceholder})`, accountRepoIdsChunk)
    if (existingResult.rows.length > 0) {
      const orgNames = existingResult.rows.map(row => row.org)
      for (const row of existingResult.rows) {
        if (orgsAlreadyAvailable.includes(row.org)) {
          continue
        }
        orgsAlreadyAvailable.push(row.org)
      }
    }
  }

  if (orgsAlreadyAvailable.length) {
    // continue to partial onboarding
    nextApp.render(req, res, '/onboard/overlap', {
      account: {
        photo: (await accountGitHubResult).account.photo
      },
      orgs,
      orgsAlreadyAvailable
    })
    return
  }

  res.redirect(302, '/onboard/repos')
})

module.exports = route

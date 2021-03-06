const Route = require('@conjurelabs/route')

const route = new Route({
  requireAuthentication: true,
  skippedHandler: async (req, res) => {
    return res.render('/_error')
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

  // verify user went through repos onboarding
  const onboardReposSelectionCookie = req.cookieSecure('onboard-repos')
  let selectedRepos = false
  try {
    const selection = JSON.parse(onboardReposSelectionCookie)
    selectedRepos = Array.isArray(selection) && selection.length
  } catch (err) {}
  if (!selectedRepos) {
    return res.redirect(302, '/onboard')
  }

  // verify user _does not have_ email present
  if (accountRows[0].email != null) {
    return res.redirect(302, '/onboard/payment')
  }

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account

  res.render('/onboard/email', {
    account: {
      photo: gitHubAccount.photo
    }
  })
})

module.exports = route

const Route = require('@conjurelabs/route')
const log = require('conjure-core/modules/log')('root path')

const route = new Route()

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.render('/landing')
  }
  next()
})

/*
  May be logged into an account that no longer exists in our system
  This will kick them out, back to the generic / landing
 */
route.push(async (req, res, next) => {
  // assuming req.isAuthenticated() === true, based on previous .get('/')
  const { DatabaseTable } = require('@conjurelabs/db')
  const account = new DatabaseTable('account')
  const accountRows = await account.select({
    id: req.user.id
  })

  // record does not exist in our db - force logout
  if (!accountRows.length) {
    return res.redirect(302, '/logout')
  }

  // checking if user needs onboarding
  if (accountRows[0].onboarded === false) {
    return res.redirect(302, '/onboard')
  }

  next()
})

/*
  Must be logged in, kick user to conjure dashboard
 */
route.push(async (req, res, next) => {
  const orgSelected = req.query.org
  const repoSelected = req.query.repo

  if (!orgSelected && !repoSelected) {
    return res.redirect('/?org=*&repo=*')
  }

  if (!orgSelected || !repoSelected) {
    return next()
  }

  const apiWatchedSummary = require('conjure-api/server/routes/api/watched/summary/get.js').call
  const watchedSummary = await apiWatchedSummary(req)
  const { watched, additional } = watchedSummary
  const { orgs, repos } = watched

  // making sure the query args are valid
  if (orgSelected !== '*' && !orgs.includes(orgSelected)) {
    log.error('Org, in query param, not available')
    return next()
  }
  // can not view specific repos if viewing all orgs
  if (orgSelected === '*' && repoSelected !== '*') {
    log.error('User attempting to view specific repo within wildcard orgs')
    return next()
  }
  // if viewing a specific repo, validate it is within the specific org
  if (repoSelected !== '*') {
    const found = repos.find(repo => repo.name === repoSelected)
    if (!found || found.org !== orgSelected) {
      log.error('Repo, in query param, not available')
      return next()
    }
  }

  // at this point org & repo values should be valid

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const accountGitHubResult = apiGetAccountGitHub(req)

  const containerStarting = req.cookies['conjure-container-starting']
  res.clearCookie('conjure-container-starting')

  const pageParams = {
    account: {
      photo: (await accountGitHubResult).account.photo // todo: not rely on github...
    },
    orgs,
    repos,
    orgSelected,
    repoSelected,
    containerStarting,
    additional
  }

  res.render('/dashboard', pageParams)
})

module.exports = route

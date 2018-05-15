const Route = require('@conjurelabs/route')
const config = require('conjure-core/modules/config')
const log = require('conjure-core/modules/log')('root path')

const nextApp = require('../next')

const route = new Route()

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  if (!req.isAuthenticated()) {
    return nextApp.render(req, res, '/landing', req.query)
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

  /*
    BEGIN INSTALLATION CHECK
   */

  const githubAccountRecords = await DatabaseTable.select('accountGithub', {
    account: req.user.id
  })

  // should not happen
  if (!githubAccountRecords.length) {
    return res.redirect(302, '/logout')
  }

  const githubAccount = githubAccountRecords[0]

  const GitHubAPI = require('conjure-core/classes/GitHub/API/App')
  const api = new GitHubAPI()

  // see https://developer.github.com/v3/apps/#list-installations-for-user
  /*
    sample output:
    [ { id: 176296,
    account: 
     { login: 'ConjureLabs',
       id: 1783213,
       avatar_url: 'https://avatars1.githubusercontent.com/u/1783213?v=4',
       gravatar_id: '',
       url: 'https://api.github.com/users/ConjureLabs',
       html_url: 'https://github.com/ConjureLabs',
       followers_url: 'https://api.github.com/users/ConjureLabs/followers',
       following_url: 'https://api.github.com/users/ConjureLabs/following{/other_user}',
       gists_url: 'https://api.github.com/users/ConjureLabs/gists{/gist_id}',
       starred_url: 'https://api.github.com/users/ConjureLabs/starred{/owner}{/repo}',
       subscriptions_url: 'https://api.github.com/users/ConjureLabs/subscriptions',
       organizations_url: 'https://api.github.com/users/ConjureLabs/orgs',
       repos_url: 'https://api.github.com/users/ConjureLabs/repos',
       events_url: 'https://api.github.com/users/ConjureLabs/events{/privacy}',
       received_events_url: 'https://api.github.com/users/ConjureLabs/received_events',
       type: 'Organization',
       site_admin: false },
    repository_selection: 'all',
    access_tokens_url: 'https://api.github.com/installations/176296/access_tokens',
    repositories_url: 'https://api.github.com/installation/repositories',
    html_url: 'https://github.com/organizations/ConjureLabs/settings/installations/176296',
    app_id: 12174,
    target_id: 1783213,
    target_type: 'Organization',
    permissions: 
     { pull_requests: 'write',
       contents: 'read',
       single_file: 'read',
       metadata: 'read' },
    events: [ 'pull_request' ],
    created_at: '2018-05-15T01:28:47.000Z',
    updated_at: '2018-05-15T01:28:48.000Z',
    single_file_name: '/.conjure/config.yml' } ]
   */
  // todo: move all this application install stuff out of web and into api
  // could not do it right away because the direct .call api does not allow cookies to be set on res...
  const installations = await api.request({
    path: '/app/installations',
    qs: {
      access_token: githubAccount.accessToken
    }
  })

  if (installations.total_count === 0) {
    return res.redirect(302, `https://github.com/apps/${config.services.github.app.name}/installations/new`)
  }

  const batchAll = require('@conjurelabs/utils/Promise/batch-all')
  const installationRecords = await batchAll(4, installations, install => {
    const { id, account } = install
    const now = new Date()
    return DatabaseTable.upsert('githubAppInstallation', {
      githubId: account.id,
      username: account.login,
      githubAccountType: account.target_type,
      installationId: id,
      photo: account.avatar_url,
      lastVerifiedActive: now,
      added: now
    }, {
      username: account.login,
      githubAccountType: account.target_type,
      photo: account.avatar_url,
      lastVerifiedActive: now,
      updated: now
    }, {
      installationId: id
    })
  })

  const installedAppsSummary = installationRecords.map(install => ({
    username: install.username,
    installationId: install.installationId
  }))

  res.cookieSecure('conjure-installed-apps', installedAppsSummary, {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true
  })

  /*
    END INSTALLATION CHECK
   */

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
  res.clearCookie('conjure-container-starting');

  const queryValues = {
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

  nextApp.render(req, res, '/dashboard', queryValues)
})

module.exports = route

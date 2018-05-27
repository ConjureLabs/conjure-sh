const Route = require('@conjurelabs/route')

const route = new Route({
  requireAuthentication: true
})

/*
  Repos listing
 */
route.push(async (req, res) => {
  const apiGetAccountCards = require('conjure-api/server/routes/api/account/payment/cards/get.js').call
  const cards = (await apiGetAccountCards(req)).cards

  // if no credit cards available, then kick user to payment entry view
  if (cards.length === 0) {
    return res.redirect(302, '/account/payment/entry')
  }

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call
  const gitHubAccount = (await apiGetAccountGitHub(req)).account

  const apiWatchedSummary = require('conjure-api/server/routes/api/watched/summary/get.js').call
  const watchedSummary = await apiWatchedSummary(req, {
    fullRecords: true
  })
  const watchedRepo = watchedSummary.watched.repos

  const apiUserRepos = require('conjure-api/server/routes/api/repos/get.js').call
  const reposByOg = (await apiUserRepos(req)).reposByOrg

  const watchedAliases = watchedRepos.map(repo => `${repo.org}/${repo.name}`)

  const otherRepos = Object.keys(reposByOg)
    .reduce((flattened, orgName) => {
      flattened.push(...reposByOg[orgName])
      return flattened
    }, [])
    .filter(repo => !watchedAliases.includes(`${repo.org}/${repo.name}`))

  res.render('/account/subscriptions', {
    account: {
      photo: gitHubAccount.photo // todo: not rely on github...
    },
    watchedRepos,
    otherRepos
  })
})

module.exports = route

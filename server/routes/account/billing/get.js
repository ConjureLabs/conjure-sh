const Route = require('@conjurelabs/route')
const nextApp = require('../../../next')

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

  nextApp.render(req, res, '/account/payment', {
    account: {
      photo: gitHubAccount.photo // todo: not rely on github...
    },
    cards
  })
})

module.exports = route

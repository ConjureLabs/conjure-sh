const Route = require('route');
const nextApp = require('../../../../next');

const route = new Route({
  requireAuthentication: true
});

/*
  Repos listing
 */
route.push(async (req, res) => {
  const apiGetAccountCards = require('conjure-api/server/routes/api/account/billing/cards/get.js').call;
  const cards = (await apiGetAccountCards(req)).cards;

  // if no credit cards available, then kick user to billing entry view
  if (cards.length === 0) {
    return res.redirect(302, '/account/billing/entry');
  }

  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
  const gitHubAccount = (await apiGetAccountGitHub(req)).account;

  console.log('CARDS', cards);

  return nextApp.render(req, res, '/account/billing', {
    account: {
      photo: gitHubAccount.photo // todo: not rely on github...
    },
    cards
  });
});

module.exports = route;

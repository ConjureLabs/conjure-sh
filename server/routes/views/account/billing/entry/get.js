const Route = require('conjure-core/classes/Route');
const nextApp = require('../../../../../next');

const route = new Route({
  requireAuthentication: true
});

/*
  Repos listing
 */
route.push((req, res, next) => {
  const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
  apiGetAccountGitHub(req, null, (err, result) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/account/billing/entry', {
      account: {
        photo: result.account.photo // todo: not rely on github...
      }
    });
  });
});

module.exports = route;

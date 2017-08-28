const Route = require('conjure-core/classes/Route');
const nextApp = require('../../../../../next');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;

const route = new Route({
  requireAuthentication: true
});

/*
  Repos listing
 */
route.push((req, res, next) => {
  const async = require('async');

  const parallel = {};

  parallel.github = callback => {
    const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
    apiGetAccountGitHub(req, null, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.account);
    });
  };

  parallel.cards = callback => {
    const apiGetAccountCards = require('conjure-api/server/routes/api/account/cards/get.js').call;
    apiGetAccountCards(req, null, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.cards);
    });
  };

  async.parallel(parallel, (err, records) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/account/billing/entry', {
      account: {
        photo: records.github.photo // todo: not rely on github...
      }
    });
  });
});

module.exports = route;

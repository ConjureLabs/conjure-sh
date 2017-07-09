const nextApp = require('../../next');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;

const handlers = [];

handlers.push((req, res, next) => {
  const waterfall = [];

  waterfall.push(callback => {
    const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').direct;
    apiGetAccountGitHub(req, null, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.account);
    });
  });

  waterfall.push((gitHubAccount, callback) => {
    const apiGetOrgs = require('conjure-api/server/routes/api/orgs/get.js').direct;
    apiGetOrgs(req, null, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, gitHubAccount, result.orgs);
    });
  });

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, gitHubAccount, orgs) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/dashboard', {
      account: {
        photo: gitHubAccount.photo // todo: not rely on github...
      },
      orgs
    });
  });
});

module.exports = handlers;

const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const nextApp = require('../../../../next');
const log = require('conjure-core/modules/log')('onboard orgs');

const route = new Route({
  requireAuthentication: true,
  skippedHandler: (req, res) => {
    nextApp.render(req, res, '/_error');
  }
});

route.push((req, res) => {
  const waterfall = [];

  // check if account is valid, and should be seeing onboard flow
  waterfall.push(callback => {
    const DatabaseTable = require('conjure-core/classes/DatabaseTable');
    const account = new DatabaseTable('account');

    account.select({
      id: req.user.id
    }, (err, rows) => {
      if (err) {
        return callback(err);
      }

      // record does not exist in our db - force logout
      if (!rows.length) {
        return res.redirect(302, '/logout');
      }

      // if already onboarded, then user should not be on this view
      if (rows[0].onboarded === true) {
        return res.redirect(302, '/');
      }

      return callback();
    });
  });

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
      log.error(err);
      return nextApp.render(req, res, '/_error');
    }

    nextApp.render(req, res, '/onboard/orgs', {
      account: {
        photo: gitHubAccount.photo
      },
      orgs
    });
  });
});

module.exports = route;

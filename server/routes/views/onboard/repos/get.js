const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const nextApp = require('../../../../next');
const log = require('conjure-core/modules/log')('onboard repos');

const route = new Route({
  requireAuthentication: true,
  skippedHandler: (req, res) => {
    nextApp.render(req, res, '/_error');
  }
});

route.push((req, res, next) => {
  const waterfall = [];

  // verify cookie from orgs onboard set
  waterfall.push(callback => {
    if (
      !req.cookies ||
      !req.cookies['conjure-onboard-orgs'] ||
      !req.cookies['conjure-onboard-orgs'].label ||
      !req.cookies['conjure-onboard-orgs'].value
    ) {
      res.redirect('/onboard/orgs');
      return;
    }

    callback();
  });

  // customer credit card should exist
  waterfall.push(callback => {
    const DatabaseTable = require('conjure-core/classes/DatabaseTable');
    const AccountCard = new DatabaseTable('account_card');

    AccountCard.select({
      account: req.user.id
    }, (err, rows) => {
      if (err) {
        return callback(err);
      }

      if (rows.length === 0) {
        res.redirect('/onboard/billing');
        return;
      }

      callback();
    });
  });

  // get github account record
  waterfall.push(callback => {
    const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').direct;
    apiGetAccountGitHub(req, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.account);
    });
  });

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, githubAccount) => {
    if (err) {
      log.error(err);
      return nextApp.render(req, res, '/_error');
    }

    nextApp.render(req, res, '/onboard/repos', {
      account: {
        photo: githubAccount.photo
      }
    });
  });
});

module.exports = route;

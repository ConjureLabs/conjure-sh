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
      res.redirect(302, '/onboard/orgs');
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
        res.redirect(302, '/onboard/billing');
        return;
      }

      callback();
    });
  });

  // gather additional records
  waterfall.push(callback => {
    const async = require('async');
    const parallel = {};

    parallel.account = cb => {
      const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').direct;
      apiGetAccountGitHub(req, null, (err, result) => {
        if (err) {
          return cb(err);
        }

        cb(null, result.account);
      });
    };

    parallel.repos = cb => {
      const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').direct;
      apiGetRepos(req, null, (err, result) => {
        if (err) {
          return cb(err);
        }

        cb(null, result.reposByOrg);
      });
    };

    async.parallel(parallel, (err, results) => {
      if (err) {
        return callback(err);
      }

      callback(null, results.account, results.repos);
    });
  });

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, githubAccount, repos) => {
    if (err) {
      log.error(err);
      return nextApp.render(req, res, '/_error');
    }

    nextApp.render(req, res, '/onboard/repos', {
      account: {
        photo: githubAccount.photo
      },
      repos,
      org: req.cookies['conjure-onboard-orgs']
    });
  });
});

module.exports = route;

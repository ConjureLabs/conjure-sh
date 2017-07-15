const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const nextApp = require('../../../next');
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

  // checking if any orgs user has access to are already listening to changes
  // and that the user has access to at least one repo within that org
  waterfall.push((gitHubAccount, orgs, callback) => {
    const repoChecks = {};
    orgs.forEach(org => {
      repoChecks[org.login] = cb => {
        const database = require('conjure-core/modules/database');
        database.query('SELECT COUNT(*) num FROM watched_repo WHERE org = $1', [org.login], (err, result) => {
          if (err) {
            return cb(err);
          }

          console.log('ROWS', result.rows);

          cb(null, (
            Array.isArray(result.rows) &&
            result.rows.length &&
            parseInt(result.rows[0].num, 10) > 0
          ));
        });
      };
    });

    const async = require('async');
    async.parallelLimit(repoChecks, 4, (err, results) => {
      if (err) {
        return callback(err);
      }

      const alreadyAvailable = Object.keys(results).filter(org => {
        return results[org] === true;
      });

      // if this account has no access to any listened repo, they must start full onboarding
      if (alreadyAvailable.length === 0) {
        return res.redirect(302, '/onboard/orgs');
      }

      // continue to partial onboarding
      callback(null, gitHubAccount, orgs, alreadyAvailable);
    });
  });

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, gitHubAccount, orgs, orgsAlreadyAvailable) => {
    if (err) {
      log.error(err);
      return nextApp.render(req, res, '/_error');
    }

    nextApp.render(req, res, '/onboard/overlap', {
      account: {
        photo: gitHubAccount.photo
      },
      orgs,
      orgsAlreadyAvailable
    });
  });
});

module.exports = route;

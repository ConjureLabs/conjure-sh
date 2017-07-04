const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const apiGetOrgs = rquire('conjure-api/server/routes/api/orgs/get.js').direct;
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

  waterfall.push(callback => {
    const DatabaseTable = require('conjure-core/classes/DatabaseTable');
    const accountGithub = new DatabaseTable('account_github');

    accountGithub.select({
      account: req.user.id
    }, (err, rows) => {
      if (err) {
        return callback(err);
      }

      // should not be possible
      if (!rows.length) {
        return callback(new UnexpectedError('Could not find GitHub account record'));
      }

      // should not be possible
      if (rows.length > 1) {
        return callback(new UnexpectedError('Expected a signle row for GitHub account record, received multiple'));
      }

      callback(null, rows[0]);
    });
  });

  waterfall.push((gitHubAccount, callback) => {
    apiGetOrgs(req, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, githubAccount, result.orgs);
    });
  });

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, githubAccount, orgs) => {
    if (err) {
      log.error(err);
      return nextApp.render(req, res, '/_error');
    }

    nextApp.render(req, res, '/onboard/orgs', {
      account: {
        photo: githubAccount.photo
      },
      orgs
    });
  });
});

module.exports = route;

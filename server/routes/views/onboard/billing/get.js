const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const nextApp = require('../../../../next');
const log = require('conjure-core/modules/log')('onboard billing');

const route = new Route({
  requireAuthentication: true,
  skippedHandler: (req, res) => {
    nextApp.render(req, res, '/_error');
  }
});

route.push((req, res, next) => {
  const waterfall = [];
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');

  waterfall.push(callback => {
    if (
      !req.cookies ||
      !req.cookies['conjure-onboard-orgs'] ||
      !req.cookies['conjure-onboard-orgs'].label ||
      !req.cookies['conjure-onboard-orgs'].value
    ) {
      return callback(new UnexpectedError('Missing org selection payload'));
    }

    callback();
  });

  waterfall.push(callback => {
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

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, githubAccount) => {
    if (err) {
      log.error(err);
      return nextApp.render(req, res, '/_error');
    }

    nextApp.render(req, res, '/onboard/billing', {
      account: {
        photo: githubAccount.photo
      }
    });
  });
});

module.exports = route;

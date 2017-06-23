const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const nextApp = require('../../../../next');

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
      return next(err);
    }

    nextApp.render(req, res, '/onboard/repos', {
      account: {
        photo: githubAccount.photo
      }
    });
  });
});

module.exports = route;

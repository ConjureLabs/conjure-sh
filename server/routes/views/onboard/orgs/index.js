const Route = require('conjure-core/classes/Route');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
const nextApp = require('../../next');

const route = new Route({
  requireAuthentication: true
});

route.push((req, res, next) => {
  const waterfall = [];

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

  waterfall.push((githubAccount, callback) => {
    const github = require('octonode');
    const githubClient = github.client(githubAccount.access_token);

    githubClient.get('/user/orgs', {}, (err, status, body) => {
      if (err) {
        return callback(err);
      }

      return callback(null, body);
    });
  });

  const asyncWaterfall = require('conjure-core/modules/async/waterfall');
  asyncWaterfall(waterfall, (err, orgs) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/onboard/orgs', {
      orgs
    });
  });
});

module.exports = route;

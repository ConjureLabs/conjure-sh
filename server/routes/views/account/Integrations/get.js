const Route = require('conjure-core/classes/Route');
const nextApp = require('../../../../next');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;

const route = new Route({
  requireAuthentication: true
});

/*
  Repos listing
 */
route.push((req, res, next) => {
  const async = require('async');
  const UniqueArray = require('conjure-core/classes/Array/UniqueArray');
  const GitHubRepo = require('conjure-core/classes/Repo/GitHub');
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');

  const parallel = {};

  parallel.github = callback => {
    const accountGithub = new DatabaseTable('account_github');

    // todo: assumes account has a github record in our db - we should have more handlers for services like bitbucket
    accountGithub.select({
      account: req.user.id
    }, (err, rows) => {
      if (err) {
        return next(err);
      }

      // should not be possible
      if (!rows.length) {
        return next(new UnexpectedError('Could not find github account record'));
      }

      // should not be possible
      if (rows.length > 1) {
        return next(new UnexpectedError('Expected a single row for github account record, received multiple'));
      }

      const githubAccount = rows[0];

      callback(null, githubAccount);
    });
  };

  async.parallel(parallel, (err, integrations) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/account/integrations', {
      reposByOrg: reposByOrg,
      account: {
        photo: integrations.github.photo // todo: not rely on github...
      },
      integrations: Object.keys(integrations).reduce((mapping, key) => {
        mapping[key] = {
          username: integrations[key].username,
          email: integrations[key].email
        };
        return mapping;
      }, {})
    });
  });
});

module.exports = route;

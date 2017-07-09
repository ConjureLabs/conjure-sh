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

  const parallel = {};

  parallel.github = callback => {
    const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').direct;
    apiGetAccountGitHub(req, null, (err, result) => {
      if (err) {
        return callback(err);
      }

      callback(null, result.account);
    });
  };

  async.parallel(parallel, (err, integrations) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/account/integrations', {
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

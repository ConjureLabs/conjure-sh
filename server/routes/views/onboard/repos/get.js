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
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');

  waterfall.push(callback => {
    const apiGetAccountGitHub = rquire('conjure-api/server/routes/api/account/github/get.js').direct;
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

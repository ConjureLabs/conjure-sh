const nextApp = require('../../next');
const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;

const handlers = [];

handlers.push((req, res, next) => {
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

  async.parallel(parallel, (err, results) => {
    if (err) {
      return next(err);
    }

    nextApp.render(req, res, '/dashboard', {
      account: {
        photo: results.github.photo // todo: not rely on github...
      }
    });
  });
});

module.exports = handlers;

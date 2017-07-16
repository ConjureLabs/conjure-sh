const Route = require('conjure-core/classes/Route');
const log = require('conjure-core/modules/log')('container proxy');

const route = new Route({
  wildcard: true
});

route.push((req, res, next) => {
  const uid = req.params.uid;
  const uriRemainder = req.url.replace(/^\/c\/[a-z0-9]+(\/?.*)$/, '$1');

  const async = require('async');

  const waterfall = [];

  waterfall.push(callback => {
    const DatabaseTable = require('conjure-core/classes/DatabaseTable');
    DatabaseTable.select('containers', {
      url_uid: uid
    }, (err, proxies) => {
      if (err) {
        return callback(err);
      }

      if (!proxies.length) {
        // no proxy record found - kick this forward, which should result in a 404
        return next();
      }

      callback(null, proxies[0]);
    });
  });

  waterfall.push((proxyRecord, callback) => {
    const DatabaseTable = require('conjure-core/classes/DatabaseTable');
    DatabaseTable.select('watched_repo', {
      id: proxyRecord.reo
    }, (err, records) => {
      if (err) {
        return callback(err);
      }

      if (!records.length) {
        // no watched repo record found - kick this forward, which should result in a 404
        return next();
      }

      const watchedRepo = records[0];

      // if not a private repo, just let the user view it
      // todo: have owner restrictions, to lower billing, able to disallow anon views
      if (!watchedRepo.private) {
        return callback(null, proxyRecord);
      }

      // must be a private repo - will need to check if user has perms
      // not using our own db, will check against github directly
      const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').direct;
      apiGetAccountGitHub(req, null, (err, result) => {
        if (err) {
          return next(err);
        }

        const githubAccount = result.account;

        const github = require('octonode');
        const githubClient = github.client(githubAccount.access_token);

        githubClient
          .repo(`${watchedRepo.org}/${watchedRepo.name}`)
          .info((err, info) => {
            if (err) {
              return callback(err);
            }

            console.log('REPO INFO');
            console.log(info);

            callback(null, proxyRecord);
          });
      });
    });
  });

  async.waterfall(waterfall, (err, proxyRecord) => {
    if (err) {
      return next(err);
    }

    const ReqProxy = require('conjure-core/classes/Req/Proxy');

    const proxy = new ReqProxy({
      host: proxyRecord.host,
      path: uriRemainder,
      port: proxyRecord.port
    });

    proxy.forward(req, res);
  });
});

module.exports = route;

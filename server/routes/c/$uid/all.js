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
    DatabaseTable.select('container', {
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
      id: proxyRecord.repo
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
      const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').direct;
      apiGetRepos(req, null, (err, result) => {
        if (err) {
          return cb(err);
        }

        const orgRepos = result.reposByOrg[ watchedRepo.org ];

        // if user has no repos in the containers org...
        if (!orgRepos) {
          return next();
        }

        // filtering down to the container's repo record
        let repo;
        for (let i = 0; i < orgRepos.length; i++) {
          if (orgRepos[i].id === watchedRepo.service_repo_id) {
            repo = orgRepos[i];
            continue;
          }
        }

        // if that repo does not exist, kick to 404
        if (!repo) {
          return next();
        }

        // if perms are not correct, kick to 404
        // only check if have read access
        if (!repo.permissions || repo.permissions.pull !== true) {
          return next();
        }

        callback(null, proxyRecord);
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

const Route = require('conjure-core/classes/Route');
const log = require('conjure-core/modules/log')('container proxy');
const nextApp = require('./next');

// const route = new Route({
//   wildcard: true,
//   skippedHandler: (req, res) => {
//     nextApp.render(req, res, '/_error');
//   }
// });

const containerViewExpr = /^(\w+)\.view\.conjure\.dev(?!\w)/;

module.exports = (req, res, next) => {
  const viewMatch = containerViewExpr.exec(req.headers.host);

  console.log(req.headers, containerViewExpr.exec(req.headers.host));
  if (!viewMatch) {
    return next();
  }

  console.log(req.cookies);

  const uid = viewMatch[1];

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
        log.info(`No container found for uid ${uid}`);
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
        log.info(`No 'watched_repo' record found for container row`); // this should not happen
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
      const apiGetRepos = require('conjure-api/server/routes/api/repos/get.js').call;
      apiGetRepos(req, null, (err, result) => {
        if (err) {
          return callback(err);
        }

        const orgRepos = result.reposByOrg[ watchedRepo.org ];

        // if user has no repos in the containers org...
        if (!orgRepos) {
          log.info(`Restricted viewing of container '${uid}', within org ${watchedRepo.org} - user does not have access to org`);
          return next();
        }

        // filtering down to the container's repo record
        let repo;
        for (let i = 0; i < orgRepos.length; i++) {
          if (orgRepos[i].id === parseInt(watchedRepo.service_repo_id, 10)) {
            repo = orgRepos[i];
            break;
          }
        }

        // if that repo does not exist, kick to 404
        if (!repo) {
          log.info(`Restricted viewing of container '${uid}', within org ${watchedRepo.org} - user does not have access to repo`);
          return next();
        }

        // if perms are not correct, kick to 404
        // only check if have read access
        if (!repo.permissions || repo.permissions.pull !== true) {
          log.info(`Restricted viewing of container '${uid}', within org ${watchedRepo.org} - user does not have proper perms`);
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
      domain: proxyRecord.host,
      path: req.url
    });

    proxy.forward(req, res);
  });
};

// module.exports = route;

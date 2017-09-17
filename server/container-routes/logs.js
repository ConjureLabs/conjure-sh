const log = require('conjure-core/modules/log')('container logs');
const nextApp = require('../next');

module.exports = (req, res, uid, next) => {
  const async = require('async');

  const waterfall = [];

  // pull up the container record being accessed
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
        return nextApp.render(req, res, '/_error');
      }

      callback(null, proxies[0]);
    });
  });

  // check permissions
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
        return nextApp.render(req, res, '/_error');
      }

      const watchedRepo = records[0];

      // if not a private repo, just let the user tail logs
      // todo: have owner restrictions, to lower billing, able to disallow anon tail logs
      // todo: determine if public views should have logs exposed
      if (!watchedRepo.private) {
        return callback(null, proxyRecord);
      }

      // if user is not logged in, then prevent tailing logs until they do
      if (!req.isAuthenticated()) {
        return nextApp.render(req, res, '/terminal/private/requires-auth');
      }

      const apiGetAccountGitHub = require('conjure-api/server/routes/api/account/github/get.js').call;
      apiGetAccountGitHub(req, null, (err, result) => {
        if (err) {
          return callback(err);
        }

        const gitHubAccount = result.account;

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
            log.info(`Restricted logs of container '${uid}', within org ${watchedRepo.org} - user does not have access to org`);
            nextApp.render(req, res, '/terminal/private/invalid-permissions', {
              account: {
                photo: gitHubAccount.photo // todo: not rely on github...
              },
              orgs
            });
            return;
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
            log.info(`Restricted logs of container '${uid}', within org ${watchedRepo.org} - user does not have access to repo`);
            nextApp.render(req, res, '/terminal/private/invalid-permissions', {
              account: {
                photo: gitHubAccount.photo // todo: not rely on github...
              },
              orgs
            });
            return;
          }

          // if perms are not correct, kick to 404
          // only check if have read access
          if (!repo.permissions || repo.permissions.pull !== true) {
            log.info(`Restricted logs of container '${uid}', within org ${watchedRepo.org} - user does not have proper perms`);
            nextApp.render(req, res, '/terminal/private/invalid-permissions', {
              account: {
                photo: gitHubAccount.photo // todo: not rely on github...
              },
              orgs
            });
            return;
          }

          callback(null, proxyRecord);
        });
      });
    });
  });

  async.waterfall(waterfall, (err, proxyRecord) => {
    if (err) {
      return next(err);
    }

    // was successful, so start tailing logs
    res.send('SHOULD SEND LOGS NOW');
  });
};

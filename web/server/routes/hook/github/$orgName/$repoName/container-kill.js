'use strict';

// todo: set up a module that handles cases like this
const asyncBreak = {};

function containerKill(payload, callback) {
  const waterfall = [];

  // get watched repo record
  waterfall.push(cb => {
    payload.watchedRepoRecord(cb);
  });

  // make sure the repo/branch is spun up
  waterfall.push((watchedRepo, cb) => {
    const DatabaseTable = require('classes/DatabaseTable');
    // todo: detect correct server host, but on develop / test keep localhost
    DatabaseTable.select('container_proxies', {
      repo: watchedRepo.id,
      commit_sha: payload.sha
    }, (err, records) => {
      if (err) {
        return cb(err);
      }

      if (!records.length) {
        return cb(asyncBreak);
      }

      cb(null, watchedRepo, records);
    });
  });

  // spin down vms
  waterfall.push((watchedRepo, runningContainerRecords, cb) => {
    const exec = require('child_process').exec;

    for (let i = 0; i < runningContainerRecords.length; i++) {
      const containerRecord = runningContainerRecords[i];

      // todo: handle non-github repos
      exec(`bash ./kill.sh "${containerRecord.url_uid}" "${containerRecord.container_id}"`, {
        cwd: process.env.VOYANT_WORKER_DIR
      }, err => {
        if (err) {
          // can't kick to callback
          return log.error(err);
        }
      });
    }

    cb(null, watchedRepo);
  });

  // remove db reference to proxy
  waterfall.push((watchedRepo, cb) => {
    const DatabaseTable = require('classes/DatabaseTable');
    DatabaseTable.delete('container_proxies', {
      repo: watchedRepo.id,
      commit_sha: payload.sha
    }, err => {
      cb(err);
    });
  });

  const async = require('async');
  async.waterfall(waterfall, err => {
    if (err === asyncBreak) {
      return callback();
    }

    callback(err);
  });
}

module.exports = containerKill;

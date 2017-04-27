'use strict';

const log = require('modules/log')('github container update');

function containerUpdate(orgName, repoName, payload, callback) {
  log.info('starting update');

  const series = [];

  // there is a better way to do this - for now, keeping it rather simple

  series.push(cb => {
    require('./container-destroy')(payload, payload.branch, cb);
  });

  series.push(cb => {
    require('./container-create')(orgName, repoName, payload, cb);
  });

  const async = require('async');
  async.series(series, err => {
    callback(err);
  });
}

module.exports = containerUpdate;

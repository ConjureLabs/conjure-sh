'use strict';

function containerUpdate(orgName, repoName, payload, callback) {
  const series = [];

  // there is a better way to do this - for now, keeping it rather simple

  series.push(cb => {
    require('./container-kill')(payload, cb);
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

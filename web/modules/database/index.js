'use strict';

const pg = require('pg');
const config = require('config');
const log = require('log')('database');

const pool = new pg.Pool(config.database.pg);

// todo: deal with client (err, client) that caused the err?
pool.on('error', err => {
  log.error(err);
});

function query() {
  const args = Array.prototype.slice.call(arguments);
  let callback = args.pop();

  if (typeof callback !== 'function') {
    throw new Error('Expected last argument to query() to be a callback');
  }

  pool.connect((err, client, done) => {
    if (err) {
      return callback(err);
    }

    // forcing `done()` to be called whenever a query returns
    args.push(function queryCallback() {
      done();
      callback.apply(callback, arguments);
    });

    client.query.apply(client, args);
  });
}

module.exports.query = query;
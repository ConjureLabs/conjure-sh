'use strict';

// todo: make this request an all.js, and support 'all' routes in sync-setup.js

const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  const uid = req.params.uid;

  const async = require('async');

  const waterfall = [];

  waterfall.push(callback => {
    const DatabaseTable = require('classes/DatabaseTable');
    DatabaseTable.select('container_proxies', {
      url_uid: uid,
    }, (err, proxies) => {
      if (err) {
        return callback(err);
      }

      if (!proxies.length) {
        // no proxy record found - kick this forward, which should result in a 404
        return next();
      }

      callback(null, proxies[0])
    });
  });

  // todo: verify logged-in user has permission to view this container

  async.waterfall(waterfall, err => {
    if (err) {
      return next(err);
    }

    // remove this with proxy to container port
    res.send({
      success: true
    });
  });
});

module.exports = route;

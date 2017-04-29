'use strict';

// todo: make this request an all.js, and support 'all' routes in sync-setup.js
// todo: wildcards after the initial path

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

    console.log(uid);

    DatabaseTable.select('container_proxies', {
      url_uid: uid,
    }, (err, proxies) => {
      console.log(proxies);

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

  // todo: verify logged-in user has permission to view this container

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

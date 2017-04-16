'use strict';

const Route = require('classes/Route');
const log = require('modules/log')('proxy debug');

const route = new Route({
  blacklistedEnv: {
    NODE_ENV: ['production']
  }
});

/*
  dev endpoint to debug env vars
 */
route.push((req, res) => {
  const ReqProxy = require('classes/Req/Proxy');

  const proxy = new ReqProxy({
    host: 'google.com',
    port: 80
  });

  proxy.on('error', err => {
    log.error(err);
  });

  proxy.forward(req, res);
});

module.exports = route;

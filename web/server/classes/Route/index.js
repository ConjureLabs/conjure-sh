'use strict';

const log = require('modules/log')('Route');

class Route extends Array {
  constructor(options) {
    super();

    this.suppressedRoutes = false;

    options = options || {};
    options.blacklistedEnv = options.blacklistedEnv || {};

    for (let key in options.blacklistedEnv) {
      const envVar = process.env[key];
      const blacklistedArray = options.blacklistedEnv[key];

      if (envVar && blacklistedArray.includes(envVar)) {
        this.suppressedRoutes = true;
        break;
      }
    }
  }

  expressRouter(verb, expressPath) {
    const express = require('express');
    const router = express.Router();

    if (this.suppressedRoutes === true) {
      return router;
    }

    for (let i = 0; i < this.length; i++) {
      log.info(verb.toUpperCase(), expressPath);

      router[ verb.toLowerCase() ](expressPath, this[i]);
    }

    return router;
  }
}

module.exports = Route;

'use strict';

class Route extends Array {
  initialize(options) {
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

  expressRouter(verb) {
    const express = require('express');
    const router = express.Router();

    if (this.suppressedRoutes === true) {
      return router;
    }

    for (let i = 0; i < this.length; i++) {
      router[ verb.toLowerCase() ](this[i]);
    }

    return router;
  }
}

module.exports = Route;

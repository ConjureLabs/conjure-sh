'use strict';

class Route extends Array {
  expressRouter(verb) {
    const express = require('express');
    const router = express.Router();

    for (let i = 0; i < this.length; i++) {
      router[verb].apply(router, this[i]);
    }

    return router;
  }
}

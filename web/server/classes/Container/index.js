'use strict';

const payload = Symbol('payload private val');

class Container {
  constructor(payloadInstance) {
    this[payload] = payloadInstance;
  }
}

const privateKeys = {
  payload
};
Container.prototype.create = require('./create')(privateKeys);
Container.prototype.destroy = require('./kill')(privateKeys);
Container.prototype.update = require('./update')(privateKeys);

module.exports = Container;

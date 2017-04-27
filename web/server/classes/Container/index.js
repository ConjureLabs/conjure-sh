'use strict';

class Container {
  constructor() {

  }
}

Container.prototype.create = require('./create');
Container.prototype.destroy = require('./kill');
Container.prototype.update = require('./update');

module.exports = Container;

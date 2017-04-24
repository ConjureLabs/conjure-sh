'use strict';

const log = require('modules/log')('repo voyant config');

const parsedInput = Symbol('parsed input');

class Config {
  constructor(ymlInput) {
    const yaml = require('node-yaml');

    try {
      this[parsedInput] = yaml.parse(ymlInput);
      this.valid = true;
    } catch(err) {
      log.error(err);
      this.valid = false;
    }
  }
}

module.exports = Config;

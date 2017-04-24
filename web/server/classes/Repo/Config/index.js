'use strict';

const log = require('modules/log')('repo voyant config');

const internalDefinition = Symbol('parsed input object definition');

// todo: validate port is valid, etc

class Config {
  constructor(ymlInput) {
    const yaml = require('node-yaml');

    try {
      this[internalDefinition] = yaml.parse(ymlInput);
    } catch(err) {
      log.error(err);
      this.valid = false;
      return;
    }

    this.valid = true
    this.machine = new MachineConfig(this[internalDefinition]);
  }
}

class MachineConfig {
  constructor(config) {
    this[internalDefinition] = config.machine;
  }

  get environment() {
    return this[internalDefinition].environment;
  }

  get languages() {
    return this[internalDefinition].languages;
  }

  get port() {
    return this[internalDefinition].port;
  }

  get pre() {
    const definedPre = this[internalDefinition].pre;
    return Array.isArray(definedPre) ? definedPre :
      typeof definedPre === 'string' ? [definedPre] :
      [];
  }
}

module.exports = Config;

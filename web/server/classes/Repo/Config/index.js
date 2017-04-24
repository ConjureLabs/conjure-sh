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

  // todo: possibly check for files like podfile or package.json and determine language, dynamically, for ux
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

  // todo: invalidate config if no start possible, etc - can bubble invalid machine config up to main config
  get start() {
    if (this[internalDefinition].start) {
      return this[internalDefinition].start;
    }

    const languages = this.languages;

    // todo: fail if multiple languages set, and no start defined
    if (!languages.length) {
      return null;
    }

    if (languages.length > 1) {
      return null;
    }

    const lang = Object.keys(languages)[0].toLowerCase();

    switch (lang) {
      case 'node':
        return 'npm start';
        break;

      default:
        return null;
    }
  }
}

module.exports = Config;

'use strict';

const parsedInput = Symbol('parsed input');

class Config {
  constructor(ymlInput) {
    const yaml = require('node-yaml');
    this[parsedInput] = yaml.parse(ymlInput);
    console.log(this[parsedInput]);
  } 
}

module.exports = Config;

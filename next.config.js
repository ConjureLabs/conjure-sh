const path = require('path');

module.exports = {};
module.exports.webpack = config => {
  config.externals = config.externals || {}
  config.externals.componentsDir = path.resolve(__dirname, 'components');
  config.externals.config = require('conjure-core/modules/config');

  // console.log(config);

  return config;
};

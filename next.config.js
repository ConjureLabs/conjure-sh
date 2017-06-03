const path = require('path');

module.exports = {};
module.exports.webpack = config => {
  config.externals = {
    componentsDir: path.resolve(__dirname, 'components'),
    config: require('conjure-core/modules/config')
  };

  return config;
};

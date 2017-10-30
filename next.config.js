const path = require('path');

module.exports = {};
module.exports.webpack = config => {
  config.externals = config.externals || {}
  config.externals.componentsDir = path.resolve(__dirname, 'components');
  config.externals.config = require('conjure-core/modules/config');

  // disabling uglify, since it is causing build errors
  // config.plugins = config.plugins.filter(plugin => {
  //   return plugin.constructor.name !== 'UglifyJsPlugin';
  // });

  // console.log(config);

  return config;
};

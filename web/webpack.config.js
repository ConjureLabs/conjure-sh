'use strict';

const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const isDev = process.env.NODE_ENV === 'development';
const cssModuleNamingConvention = isDev ? '[path]__[local]' : '[hash:base64:5]';

const dirs = {
  client: path.resolve(__dirname, 'client')
};

module.exports = {
  context: dirs.client,
  entry: {
    landing: ['babel-polyfill', './views/Landing'],
    repos: ['babel-polyfill', './views/Repos'],
    'status-404': ['babel-polyfill', './views/Status-404']
  },
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: require.resolve('react'),
      loader: 'expose?React'
    }, {
      test: /\.js$/,
      exclude: 'node_modules',
      include: dirs.client,
      loader: 'babel',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.styl$/,
      exclude: 'node_modules',
      include: dirs.client,
      loader: `style!css?modules&localIdentName=${cssModuleNamingConvention}!stylus`
    }]
  },
  resolve: {
    root: dirs.client,
    alias: {
      'c': path.resolve(dirs.client, 'components'),
      'm': path.resolve(dirs.client, 'modules')
    }
  },
  node: {
    __dirname: true
  },
  plugins: isDev ? [] : [ new UglifyJsPlugin() ],
  keepalive: false,
  watchOptions: {
    poll: true
  },
  devtool: isDev ? 'source-map' : 'cheap-source-map'
};

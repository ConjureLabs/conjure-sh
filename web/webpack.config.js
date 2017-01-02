'use strict';

const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

const isDev = process.env.NODE_ENV === 'development';
const cssModuleNamingConvention = isDev ? '[path]__[local]' : '[hash:base64:5]';

module.exports = {
  context: path.resolve(__dirname, 'client'),
  entry: {
    dashboard: ['babel-polyfill', './views/Dashboard'],
    landing: ['babel-polyfill', './views/Landing']
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
      include: path.resolve(__dirname, 'client'),
      loader: 'babel',
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.styl$/,
      exclude: 'node_modules',
      include: path.resolve(__dirname, 'client'),
      loader: `style!css?modules&localIdentName=${cssModuleNamingConvention}!stylus`
    }]
  },
  resolve: {
    root: path.resolve(__dirname, 'client')
  },
  plugins: isDev ? [] : [ new UglifyJsPlugin() ],
  keepalive: false,
  watchOptions: {
    poll: true
  },
  devtool: isDev ? 'source-map' : 'cheap-source-map'
};

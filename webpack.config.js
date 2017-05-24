'use strict';

const path = require('path');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// on development, it's good not to uglify/compress/obfuscate things
const isDev = process.env.NODE_ENV === 'development';
// classnames will be automagically named - on development we want easier to read names, so they can be traced back
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
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id]-chunk.js'
  },

  module: {
    rules: [
      // for react
      {
        test: require.resolve('react'),
        use: [{
          loader: 'expose-loader',
          options: 'React'
        }]
      },
      
      // using babel to parse js files, excluding those in node_modules,
      // with presets that support react and 'stage-0' (2015 es6) js
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: dirs.client,
        use: [{
          loader: 'babel-loader',
          options: {
            plugins: ['transform-runtime'],
            presets: ['es2015', 'stage-0', 'react']
          }
        }]
      },

      // parse .style files, excluding those in node_modules
      {
        test: /\.styl$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        include: dirs.client,
        parser: {
          node: true
        },
        use: [{
          loader: 'style-loader',
          options: {
            sourceMap: isDev
          }
        }, {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            localIdentName: cssModuleNamingConvention,
            modules: true,
            sourceMap: isDev
          }
        }, {
          loader: 'stylus-loader',
          options: {
            sourceMap: isDev,
            outputStyle: 'expanded',
            includePaths: [
              process.env.NODE_PATH,
              path.resolve(__dirname, 'client')
            ]
          }
        }]
      }
    ]
  },

  // resolve can be used to simplify paths.
  // this is personal perference.
  // in my react files, i can write `import X from 'c/myComponent'`
  // this will resolve to './client/components/myComponent'
  // otherwise i would have to use relative paths, to my local files
  resolve: {
    alias: {
      'c': path.resolve(dirs.client, 'components'),
      'm': path.resolve(dirs.client, 'modules')
    }
  },

  // if not on prod, obfuscate things
  plugins: isDev ? [] : [ new UglifyJsPlugin() ],

  devtool: isDev ? 'source-map' : 'cheap-source-map'
};

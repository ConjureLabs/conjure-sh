// using this file to cache the next app in one export
const next = require('next')
const path = require('path')
const remarkHighlight = require('remark-highlight.js')

const app = next({
  dev: process.env.NODE_ENV !== 'production',
  publicRuntimeConfig: require('../client.config.js'),
  conf: {
    useFileSystemPublicRoutes: false,
    pageExtensions: ['js', 'md'],
    webpack: (config, { defaultLoaders }) => {
      config.module.rules.push({
        test: /\.md$/,
        use: [
          defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {
              mdPlugins: [require('./whitespace-remark-plugin'), remarkHighlight]
            }
          }
        ]
      })

      config.resolve = config.resolve || {}
      config.resolve.alias = config.resolve.alias || {}
      config.resolve.alias.components = path.resolve(__dirname, '..', 'components')
      config.resolve.alias.shared = path.resolve(__dirname, '..', 'shared')
      config.resolve.alias['client.config.js'] = path.resolve(__dirname, '..', 'client.config.js')

      return config
    }
  }
})

module.exports = app

const path = require('path')

/*
  This file is needed for `npm run build`
*/

module.exports = {}
module.exports.pageExtensions = ['js', 'jsx', 'md', 'mdx']
module.exports.webpack = (config, { defaultLoaders }) => {
  config.module.rules.push({
    test: /\.md$/,
    use: [
      'babel-loader',
      '@mdx-js/loader'
    ]
  })

  config.resolve = config.resolve || {}
  config.resolve.alias = config.resolve.alias || {}
  config.resolve.alias.components = path.resolve(__dirname, '..', 'components')
  config.resolve.alias.shared = path.resolve(__dirname, '..', 'shared')
  config.resolve.alias.mdx = path.resolve(__dirname, '..', 'mdx')
  config.resolve.alias['client.config.js'] = path.resolve(__dirname, '..', 'client.config.js')

  return config
}

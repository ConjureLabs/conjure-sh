const path = require('path')

/*
  This file is needed for `npm run build`
*/

module.exports = {}
module.exports.pageExtensions = ['js', 'jsx', 'md', 'mdx']
module.exports.webpack = (config, { defaultLoaders }) => {
  config.externals = config.externals || {}
  config.externals.componentsDir = path.resolve(__dirname, 'components')
  config.externals.config = require('conjure-core/modules/config')

  // disabling uglify, since it is causing build errors
  // config.plugins = config.plugins.filter(plugin => {
  //   return plugin.constructor.name !== 'UglifyJsPlugin'
  // })

  // console.log(config)
  
  config.module.rules.push({
    test: /\.md$/,
    use: [
      defaultLoaders.babel,
      '@mdx-js/loader'
    ]
  })

  return config
}

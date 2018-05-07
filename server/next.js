// using this file to cache the next app in one export
const next = require('next')
const app = next({
  dev: process.env.NODE_ENV !== 'production',
  conf: {
    useFileSystemPublicRoutes: false,
    pageExtensions: ['js', 'md'],
    webpack: (config, { defaultLoaders }) => {
      config.module.rules.push({
        test: /\.md$/,
        use: [
          defaultLoaders.babel,
          '@mdx-js/loader'
        ]
      })

      return config
    }
  }
})

module.exports = app

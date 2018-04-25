module.exports = {
  clientConfig: {
    fullConfig: require('conjure-core/modules/config'),
    keys: [
      'app.api.url',
      'app.web.url',
      'app.worker.port',
      'app.worker.protocol'
    ]
  }
}

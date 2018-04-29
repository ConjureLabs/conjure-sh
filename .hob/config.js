module.exports = {
  fullConfig: require('conjure-core/modules/config'),

  clientConfig: {
    keys: [
      'app.api.url',
      'app.web.url',
      'app.worker.port',
      'app.worker.protocol'
    ]
  }
}

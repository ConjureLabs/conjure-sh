module.exports = {
  serverConfigRequire: 'conjure-core/modules/config',

  clientConfigKeys: [
    'app.api.url',
    'app.web.url',
    'app.worker.port',
    'app.worker.protocol'
  ]
}

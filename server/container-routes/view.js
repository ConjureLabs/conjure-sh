module.exports = (req, res, containerRecord, next) => {
  const ReqProxy = require('conjure-core/classes/Req/Proxy')

  // was successful, so proxy the request to the docker instance
  const proxy = new ReqProxy({
    domain: containerRecord.publicIp,
    path: req.url,
    port: containerRecord.hostPort,
    protocol: 'http' // fargate is not ssl
  })

  try {
    proxy.forward(req, res, next)
  } catch(err) {
    console.error(err)
  }
}

module.exports = (req, res, containerRecord, next) => {
  const ReqProxy = require('conjure-core/classes/Req/Proxy')

  // was successful, so proxy the request to the docker instance
  const proxy = new ReqProxy({
    domain: containerRecord.public_ip,
    path: req.url,
    port: containerRecord.host_port
  })

  try {
    proxy.forward(req, res)
  } catch(err) {
    console.error(err)
    next()
  }
}

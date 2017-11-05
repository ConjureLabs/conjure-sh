module.exports = (req, res, containerRecord) => {
  const ReqProxy = require('conjure-core/classes/Req/Proxy');

  // was successful, so proxy the request to the docker instance
  const proxy = new ReqProxy({
    domain: process.env.NODE_ENV === 'development' ? 'localhost' : containerRecord.host, // todo: may want to config this
    path: req.url,
    port: containerRecord.port
  });

  proxy.forward(req, res);
};

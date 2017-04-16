'use strict';

const EventEmitter = require('events');

const noOp = function() {};

class ReqProxy extends EventEmitter {
  constructor(options) {
    super();

    options = options || {};

    const config = require('modules/config');

    this.host = options.host || config.app.publicHost;
    this.port = options.port || config.app.port;
    this.path = options.path || '';
    this.method = typeof options.method === 'string' ? options.method.toUpperCase() : 'GET';
    this.encoding = options.encoding || 'utf8';
  }

  forward(req, res, callback) {
    callback = callback || noOp;

    const forwardOptions = Object.assign({}, this.options, {
      headers: req.headers
    });

    const http = require('http');

    const forwardReq = http.request(forwardOptions, forwardRes => {
      forwardRes.setEncoding(this.options.encoding);

      forwardRes.on('data', data => {
        res.write(data);
      });

      forwardRes.on('close', () => {
        res.writeHead(forwardRes.statusCode);
        res.end();
      });

      forwardRes.on('end', () => {
        res.writeHead(forwardRes.statusCode);
        res.end();
      });
    });

    forwardReq.on('error', err => {
      this.emit('error', err);
    });

    return this;
  }
}

module.exports = ReqProxy;

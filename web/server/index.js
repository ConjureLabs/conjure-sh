'use strict';

console.log( process.env );

// first running any synchronous setup
require('./setup');

const express = require('express');
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log = require('log')();

const port = process.env.PORT || 3000;
const server = express();

if (process.env.NODE_ENV !== 'production') {
  Error.stackTraceLimit = Infinity;
}
process.env.TZ = 'America/Los_Angeles';

// log fatal exceptions
process.on('uncaughtException', err => {
  if (err.message) {
    console.error('Caught exception (message): ', err.message);
  }
  if (err.stack) {
    console.error('Caught exception (stack): ', err.stack);
  }
  if (!err.message && !err.stack) {
    console.error('Caught exception:', err);
  }

  process.nextTick(() => {
    process.exit();
  });
});

server.use(compression());
server.set('port', port);
server.set('views', path.join(__dirname, '..', 'views'));
server.set('view engine', 'jade');
server.disable('view cache');
server.use(express.static(path.resolve(__dirname, 'public')));
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use(cookieParser());

server.use((req, res, next) => {
  req.state = {}; // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();
});

server.use(require('./routes'));

server.use((err, req, res, next) => {
  if (err) {
    log.error(err);
  }

  next(err);
});

server.listen(port, () => {
  log.info(`listening on :${port}`);
});

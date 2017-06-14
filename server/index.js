// first running any synchronous setup
const setup = require('./setup');

const config = require('conjure-core/modules/config');
const express = require('express');
const nextApp = require('./next');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const log = require('conjure-core/modules/log')();

const port = config.app.web.port;
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
server.use(morgan('combined'));

server.use(cookieSession({
  cookie: {
    domain: `.${config.app.api.domain}`,
    httpOnly: true,
    maxAge: config.session.duration,
    overwrite: true,
    sameSite: 'lax',
    secure: config.app.api.protocol === 'https',
    signed: true
  },
  name: 'conjure',
  secret: config.session.secret
}));

server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

passport.serializeUser((user, done) => {
  const DatabaseRow = require('conjure-core/classes/DatabaseRow');
  done(null, new DatabaseRow('account', user));
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

server.use((req, res, next) => {
  req.state = {}; // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();
});

server.use(setup.routes.views);
server.use(setup.routes.c);

const catchAllRouter = express.Router();
const nextDefaultGetHandler = nextApp.getRequestHandler();
catchAllRouter.get('*', (req, res) => {
  nextDefaultGetHandler(req, res);
});
server.use(catchAllRouter);

nextApp
  .prepare()
  .then(() => {
    server.listen(port, () => {
      log.info(`listening on :${port}`);
    });
  });

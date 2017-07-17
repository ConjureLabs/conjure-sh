// first running any synchronous setup
const setup = require('./setup');

// dependencies
const config = require('conjure-core/modules/config');
const express = require('express');
const subdomain = require('express-subdomain');
const nextApp = require('./next');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const log = require('conjure-core/modules/log')();

// constants
const port = config.app.web.port;
const server = express();

if (process.env.NODE_ENV !== 'production') {
  // this results in full stacktraces, when not in prod
  Error.stackTraceLimit = Infinity;
}
// override node time
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

// basic server config
server.use(compression());
server.set('port', port);
server.use(morgan('combined'));

// server passport cookie config
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

// server passport config
server.use(passport.initialize());
server.use(passport.session());
server.use(cookieParser());

// passport serialization
passport.serializeUser((user, done) => {
  const DatabaseRow = require('conjure-core/classes/DatabaseRow');
  done(null, new DatabaseRow('account', user));
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// tracking req state (like ip address)
server.use((req, res, next) => {
  req.state = {}; // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();
});

// initialize routes
server.use(setup.routes.views);

// container subdomain wizardry
const containerViewRoute = require('./container.view.js');
server.use(subdomain('*.view', containerViewRoute.expressRouter('all', '*')));

// any non-caught GET route then goes on to the nextjs handler
const catchAllRouter = express.Router();
const nextDefaultGetHandler = nextApp.getRequestHandler();
catchAllRouter.get('*', (req, res) => {
  nextDefaultGetHandler(req, res);
});
server.use(catchAllRouter);

// startup next app
nextApp
  .prepare()
  .then(() => {
    // startup express
    server.listen(port, () => {
      log.info(`listening on :${port}`);
    });
  });

require('conjure-core/modules/utils/process/handle-exceptions');

// first running any synchronous setup
const setup = require('./setup');

// dependencies
const config = require('conjure-core/modules/config');
const express = require('express');
const nextApp = require('./next');
const compression = require('compression');
const morgan = require('morgan');
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

// basic server config
server.use(compression());
server.set('port', port);
server.use(morgan('combined'));

// server passport cookie config
server.use(cookieSession({
  name: 'conjure',
  secret: config.session.secret,

  // cookie options
  domain: process.env.NODE_ENV === 'production' ? '.conjure.sh' : `.${config.app.api.domain}`,
  httpOnly: true,
  maxAge: config.session.duration,
  overwrite: true,
  sameSite: 'lax',
  secure: config.app.api.protocol === 'https',
  signed: true
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

if (config.app.web.protocol === 'https') {
  const forcedHttpsRouter = express.Router();
  forcedHttpsRouter.get('*', (req, res, next) => {
    if (req.headers && req.headers['x-forwarded-proto'] === 'https') {
      return next();
    }
    res.redirect(`${config.app.web.url}${req.url}`);
  });
  server.use(forcedHttpsRouter);
}

// tracking req state (like ip address)
server.use((req, res, next) => {
  req.state = {}; // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();
});

const robotsRouter = express.Router();
robotsRouter.get('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');

  if (req.headers.host === config.app.web.host) {
    return res.send(
`User-agent: *
Disallow: /?org=
`
    );
  }
  
  res.send(
`User-agent: *
Disallow: /
`
  );
});
server.use(robotsRouter);

// container routes (to view web or logs)
server.use(require('./container-routes'));

// initialize routes
server.use(setup.routes.views);

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

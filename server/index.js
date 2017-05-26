// first running any synchronous setup
const setup = require('./setup');

const config = require('conjure-core/modules/config');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
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
  cookieName: 'conjure',
  secret: config.session.secret,
  duration: config.session.duration,
  cookie: {
    httpOnly: true,
    secure: config.app.api.protocol === 'https'
  }
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

server.set('views', path.join(__dirname, '..', 'views'));
server.set('view engine', 'jade');
server.disable('view cache');
server.use(express.static(path.resolve(__dirname, '..', 'public')));

server.use((req, res, next) => {
  req.state = {}; // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();
});

server.use(setup.routes.views);
server.use(setup.routes.c);

// 404 status view
const statusRouter = express.Router();
statusRouter.get('*', (req, res, next) => {
  // prevent non-html pages from rendering a 404
  if (typeof req.headers.accept !== 'string' || !req.headers.accept.includes('text/html')) {
    return next();
  }

  // showing a random confused travolta, for fun
  const request = require('request');

  request({
    url: 'http://api.giphy.com/v1/gifs/search',
    method: 'get',
    qs: {
      q: 'confused travolta',
      api_key: 'dc6zaTOxFJmzC'
    },
    json: true
  }, (err, _, content) => {
    let gifUrl = `${config.app.web.url}/images/gifs/confused-travolta.gif`;
    let webpUrl;

    // doing several checks so that 404s do not break becaue of potential gify changes or downtime
    if (err) {
      log.error(err);
    } else {
      // if we got expected content from the gify endpoint...
      if (Array.isArray(content.data) && content.data.length) {
        // attempt to get a random image
        const index = Math.floor( Math.random() * content.data.length );
        if (
          content.data[index].images &&
          content.data[index].images.original &&
          typeof content.data[index].images.original.url === 'string'
        ) {
          gifUrl = content.data[index].images.original.url;
          webpUrl = content.data[index].images.original.webp;
        }
      }
    }

    res.render('status-404', {
      name: 'status-404',
      gifUrl,
      webpUrl: webpUrl || ''
    });
  });
});
server.use(statusRouter);

server.listen(port, () => {
  log.info(`listening on :${port}`);
});

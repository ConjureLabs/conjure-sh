'use strict';

// first running any synchronous setup
const setup = require('./setup');

const config = require('modules/config');
const express = require('express');
const compression = require('compression');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const log = require('modules/log')();

const port = process.env.PORT;
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

// todo: keep this in a util module?
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

server.use(cookieSession({
  cookieName: 'voyant',
  secret: 'LYU.yxn^E0T$TvklkLzxdg$$#q!vI1sJAoSgI<rl<LZumyX*@@@!blJ<4wYzNXOl',
  duration: 8 * day, // 8 days = 1 week + 1 day, enough that a 5day worker will not get kicked
  cookie: {
    httpOnly: true,
    secure: config.app.protocol === 'https'
  }
}));

server.use(passport.initialize());
server.use(passport.session());
server.set('views', path.join(__dirname, '..', 'views'));
server.set('view engine', 'jade');
server.disable('view cache');
server.use(express.static(path.resolve(__dirname, '..', 'public')));
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use(cookieParser());

passport.serializeUser((user, done) => {
  const DatabaseRow = require('classes/DatabaseRow');
  done(null, new DatabaseRow('account', user));
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: config.services.github.id,
      clientSecret: config.services.github.secret,
      callbackURL: `${config.app.protocol}://${config.app.host}/auth/github/callback`,
      scope: 'repo,admin:public_key,user:email,write:repo_hook,admin:org_hook'
    },

    function(accessToken, refreshToken, profile, callback) {
      const DatabaseTable = require('classes/DatabaseTable');

      if (!profile.id || isNaN(parseInt(profile.id, 10))) {
        return callback(new Error('Github Id was not present in profile json'));
      }

      // check for existing account record
      DatabaseTable.select('account_github', {
        github_id: profile.id
      }, (err, rows) => {
        if (err) {
          return callback(err);
        }

        // have logged in using github before...
        if (rows.length === 1) {
          const githubAccount = rows[0];

          // finding associated voyant account
          DatabaseTable.select('account', {
            id: githubAccount.account
          }, (err, rows) => {
            if (err) {
              return callback(err);
            }

            // this should not happen, since the voyant account showed the associated id
            if (!rows.length) {
              return callback(new Error('Voyant account record not found for associated Github account'));
            }

            const account = rows[0];

            // record the login
            DatabaseTable.insert('account_login', {
              account: account.id,
              service: DatabaseTable.cast('github', 'account_login_service'),
              added: DatabaseTable.literal('NOW()')
            }, err => {
              callback(err, account);
            });
          });
          return;
        }

        // todo: deal with github logins where account record already exists,
        // since the user logged in with another service
        // (need to lookup other records on email?)
        
        // need a voyant account
        DatabaseTable.insert('account', {
          name: profile.displayName,
          added: DatabaseTable.literal('NOW()')
        }, (err, rows) => {
          const account = rows[0];

          console.log(profile);

          DatabaseTable.insert('account_github', {
            github_id: profile.id,
            account: account.id,
            username: profile.username,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.avatar_url,
            access_token: accessToken,
            added: DatabaseTable.literal('NOW()')
          }, err => {
              if (err) {
                return callback(err);
              }

              // record the login
              DatabaseTable.insert('account_login', {
                account: account.id,
                service: DatabaseTable.cast('github', 'account_login_service'),
                added: DatabaseTable.literal('NOW()')
              }, err => {
                callback(err, account);
              });
            }
          );
        });
      });
    }
  )
);

server.use((req, res, next) => {
  req.state = {}; // used to track anything useful, along the lifetime of a request
  req.state.remoteAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  next();
});

// if user has bad cookie, kick 'um
server.use((req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  if (isNaN(req.user.id)) {
    req.logout();
    return next();
  }

  const DatabaseTable = require('classes/DatabaseTable');

  // check for existing account record
  DatabaseTable.select('account', {
    id: req.user.id
  }, (err, rows) => {
    if (err) {
      return next(err);
    }

    if (!rows.length) {
      log.info('User forced logout -- bad cookie');
      req.logout();
    }

    next();
  });
});

server.use(setup.routes.api);
server.use(setup.routes.hook);
server.use(setup.routes.views);
server.use(setup.routes.c);

server.use((err, req, res, next) => {
  if (err) {
    log.error(err);

    // logging github errors if we have them
    if (err.body && Array.isArray(err.errors)) {
      console.dir(err.errors);
    }

    if (process.env.NODE_ENV === 'production') {
      return next();
    }
    return next(err);
  }

  next();
});

// 404 status view
const statusRouter = express.Router();
statusRouter.get('*', (req, res) => {
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
    let gifUrl = `${config.app.url}/images/gifs/confused-travolta.gif`;

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
          gifUrl == content.data[index].images.original.url;
        }
      }
    }

    res.render('status-404', {
      name: 'status-404',
      gifUrl
    });
  });
});
server.use(statusRouter);

server.listen(port, () => {
  log.info(`listening on :${port}`);
});

'use strict';

// first running any synchronous setup
require('./setup');

const config = require('config');
const express = require('express');
const compression = require('compression');
const cookieSession = require('cookie-session');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
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
server.use(morgan('combined'));

// todo: keep this in a util module?
const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

server.use(cookieSession({
  cookieName: 'cosmoci',
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
server.use(express.static(path.resolve(__dirname, 'public')));
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());
server.use(cookieParser());

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user);
});
passport.deserializeUser((user, done) => {
  console.log('deserialize', user);
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: config.services.github.id,
      clientSecret: config.services.github.secret,
      callbackURL: `${config.app.protocol}://${config.app.host}/auth/github/callback`,
      scope: 'repo,admin:public_key,user:email'
    },

    function(accessToken, refreshToken, profile, callback) {
      const database = require('database');

      if (!profile.id || isNaN(parseInt(profile.id, 10))) {
        return callback(new Error('Github Id was not present in profile json'));
      }

      // todo: classify database tables O_____o

      // check for existing account record
      database.query('SELECT * FROM account_github WHERE github_id = $1', [profile.id], (err, result) => {
        if (err) {
          return callback(err);
        }

        // have logged in using github before...
        if (result.rows.length === 1) {
          const githubAccount = result.rows[0];

          // finding associated cosmo account
          database.query('SELECT * FROM account WHERE id = $1', [githubAccount.account], (err, result) => {
            if (err) {
              return callback(err);
            }

            // this should not happen, since the cosmo account showed the associated id
            if (!result.rows.length) {
              return callback(new Error('Cosmo account record not found for associated Github account'));
            }

            const account = result.rows[0];

            // record the login
            database.query('INSERT INTO account_login (account, service, added) VALUES($1, \'github\', NOW())', [account.id], err => {
              callback(err, account);
            });
          });
          return;
        }

        // todo: deal with github logins where cosmo user record already exists,
        // since the user logged in with another service
        // (need to lookup other records on email?)
        
        // need a cosmo account
        database.query('INSERT INTO account (name, added) VALUES ($1, NOW()) RETURNING *', [profile.displayName], (err, result) => {
          if (err) {
            return callback(err);
          }

          const account = result.rows[0];

          database.query(
            'INSERT INTO account_github(github_id, account, username, name, email, photo, access_token, added) VALUES($1, $2, $3, $4, $5, $6, $7, NOW())',
            [ profile.id, account.id, profile.username, profile.displayName, profile.emails[0].value, accessToken, profile.profileUrl ],
            err => {
              if (err) {
                return callback(err);
              }

              // record the login
              database.query('INSERT INTO account_login (account, service, added) VALUES($1, \'github\', NOW())', [account.id], err => {
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

server.use(require('./routes'));

server.use((err, req, res, next) => {
  if (err) {
    log.error(err);

    if (process.env.NODE_ENV === 'production') {
      return next();
    }
    return next(err);
  }

  next();
});

server.listen(port, () => {
  log.info(`listening on :${port}`);
});

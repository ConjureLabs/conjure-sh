'use strict';

const config = require('modules/config');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const log = require('modules/log')('routes');

const router = express.Router();

/*
  Logged-out landing page
 */
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.render('landing');
});

/*
  Dashboard
 */
router.get('/', (req, res, next) => {
  const Github = require('github');

  const github = new Github({
    debug: true,
    protocol: 'https'
  });

  const database = require('modules/database');

  database.query('SELECT * FROM account_github WHERE account = $1', [req.user.id], (err, result) => {
    if (err) {
      return next(err);
    }

    // should not be possible
    if (!result.rows.length) {
      return next(new Error('Could not find github account record'));
    }

    const githubAccount = result.rows[0];

    console.log(githubAccount);

    github.authenticate({
      type: 'token',
      token: githubAccount.access_token
    });

    github.orgs.getForUser({
      username: githubAccount.username
    }, function(err, res) {
      console.log(err, res);
    });

    res.render('dashboard');
  });
});

/*
  Passport session logout
 */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

/*
  dev endpoints to see who i am, etc
 */
// todo: add a handler to each of these that just calls next() if === production
if (process.env.NODE_ENV !== 'production') {
  router.get('/me', (req, res) => {
    res.send({
      authed: req.isAuthenticated(),
      user: req.user
    });
  });

  router.get('/env', (req, res, next) => {
    console.dir(process.env);
    return next();
  });
}

/*
  Auth callback
 */
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/', // todo: /login ?
    successRedirect: '/'
  })
);

/*
  Auth initiation
 */
router.post('/auth/github', passport.authenticate('github'));

module.exports = router;

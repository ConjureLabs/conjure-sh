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

  res.render('landing', {
    name: 'landing'
  });
});

/*
  May be logged into an account that no longer exists in our system
  This will kick them out, back to the generic / landing
 */
router.get('/', (req, res, next) => {
  // assuming req.isAuthenticated() === true, based on previous .get('/')
  const DatabaseTable = require('classes/DatabaseTable');
  const account = new DatabaseTable('account');

  account.select({
    id: req.user.id
  }, (err, rows) => {
    if (err) {
      return next(err);
    }

    // record does not exist in our db - force logout
    if (!rows.length) {
      return res.redirect(302, '/logout');
    }

    // godspeed, señor
    return next();
  });
});

/*
  Dashboard
 */
router.get('/', (req, res, next) => {
  const DatabaseTable = require('classes/DatabaseTable');
  const accountGithub = new DatabaseTable('account_github');

  // todo: assumes account has a github record in our db - we should have more handlers for services like bitbucket
  accountGithub.select({
    account: req.user.id
  }, (err, rows) => {
    if (err) {
      return next(err);
    }

    // should not be possible
    if (!rows.length) {
      return next(new Error('Could not find github account record'));
    }

    // should not be possible
    if (rows.length > 1) {
      return next(new Error('Expected a single row for github account record, received multiple'));
    }

    const githubAccount = rows[0];

    const github = require('octonode');
    const githubClient = github.client(githubAccount.access_token);

    githubClient.get('/user/orgs', {}, (err, status, body) => {
      console.log(body);

      res.render('dashboard', {
        name: 'dashboard'
      });
    });
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

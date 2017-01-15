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
  const DatabaseTable = require('classes/DatabaseTable');
  const accountGithub = new DatabaseTable('account_github');

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

    console.log(githubAccount);

    const github = require('octonode');
    const githubClient = github.client(githubAccount.access_token);

    githubClient.get('/user/orgs', {}, (err, status, body) => {
      console.log(err);
      console.log(status);
      console.log(body);

      res.render('dashboard');
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

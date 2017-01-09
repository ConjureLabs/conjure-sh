'use strict';

const config = require('config');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const log = require('log')('routes');

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
router.get('/', (req, res) => {
  res.render('dashboard');
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
    failureRedirect: '/bad', // todo: /login ?
    successRedirect: '/good'
  })
);

/*
  Auth initiation
 */
router.post('/auth/github', passport.authenticate('github'));

module.exports = router;

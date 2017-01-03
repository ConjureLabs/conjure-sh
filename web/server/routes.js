'use strict';

const config = require('config');
const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const log = require('log')('routes');

console.log(process.env);

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
  Auth callback
 */
router.get(
  '/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/' // todo: /login ?
  }),
  (req, res) => {
    res.redirect('/');
  }
);

/*
  Auth initiation
 */
router.post('/auth/github', passport.authenticate('github'));

module.exports = router;

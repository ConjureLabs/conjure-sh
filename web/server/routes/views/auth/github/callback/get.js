'use strict';

const Route = require('classes/Route');
const passport = require('passport');

const route = new Route();

/*
  Auth callback
 */
route.push(passport.authenticate('github', {
  failureRedirect: '/', // todo: /login ?
  successRedirect: '/'
}));

module.exports = route;
const Route = require('conjure-core/classes/Route');

const route = new Route();

const nextApp = require('../../next');

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return nextApp.render(req, res, '/landing', req.query)
});

/*
  May be logged into an account that no longer exists in our system
  This will kick them out, back to the generic / landing
 */
route.push((req, res, next) => {
  // assuming req.isAuthenticated() === true, based on previous .get('/')
  const DatabaseTable = require('conjure-core/classes/DatabaseTable');
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
  Must be logged in, kick user to repo listing
 */
route.push((req, res, next) => {
  res.redirect('/r');
});

module.exports = route;

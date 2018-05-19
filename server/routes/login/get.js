const Route = require('@conjurelabs/route')
const nextApp = require('../../next')

const route = new Route()

/*
  Passport session logout
 */
route.push((req, res) => {
  if (req.isAuthenticated()) {
    res.redirect(302, '/')
  }

  nextApp.render(req, res, '/forced-login')
})

module.exports = route

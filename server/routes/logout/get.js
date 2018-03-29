const Route = require('@conjurelabs/route')

const route = new Route()

/*
  Passport session logout
 */
route.push((req, res) => {
  req.logout()
  res.redirect(302, '/')
})

module.exports = route

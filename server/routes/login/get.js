const Route = require('@conjurelabs/route')

const route = new Route()

/*
  Passport session logout
 */
route.push((req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect(302, '/')
  }

  res.render('/forced-login')
})

module.exports = route

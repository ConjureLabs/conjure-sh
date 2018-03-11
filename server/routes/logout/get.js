const Route = require('@conjurelabs/route')

const route = new Route()

/*
  Passport session logout
 */
route.push(async (req, res) => {
  req.logout()
  return res.redirect(302, '/')
})

module.exports = route

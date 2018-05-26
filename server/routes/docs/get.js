const Route = require('@conjurelabs/route')

const route = new Route()

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  return res.render('/docs')
})

module.exports = route

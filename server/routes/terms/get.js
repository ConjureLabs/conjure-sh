const Route = require('@conjurelabs/route')

const route = new Route()

/*
  Logged-out landing page
 */
route.push((req, res) => {
  return res.render('/terms')
})

module.exports = route

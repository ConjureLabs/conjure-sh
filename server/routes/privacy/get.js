const Route = require('@conjurelabs/route')
const nextApp = require('../../next')

const route = new Route()

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  return nextApp.render(req, res, '/privacy', req.query)
})

module.exports = route

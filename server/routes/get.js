const Route = require('@conjurelabs/route')
const nextApp = require('../next')
const log = require('conjure-core/modules/log')('root path')

const route = new Route()

/*
  Logged-out landing page
 */
route.push((req, res, next) => {
  return nextApp.render(req, res, '/landing')
})

module.exports = route

const Route = require('@conjurelabs/route')

const route = new Route()

route.push((req, res) => {
  res.redirect('/docs/configuration')
})

module.exports = route

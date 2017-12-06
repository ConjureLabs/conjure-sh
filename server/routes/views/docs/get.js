const Route = require('conjure-core/classes/Route');

const route = new Route();

route.push(async (req, res) => {
  return res.redirect('/docs/configuration');
});

module.exports = route;

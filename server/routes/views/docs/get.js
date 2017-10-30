const Route = require('conjure-core/classes/Route');
const nextApp = require('../../../next');

const route = new Route();

route.push(async (req, res) => {
  nextApp.render(req, res, '/docs');
});

module.exports = route;

'use strict';

const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  console.log(req.body);
  res.send('sure');
});

module.exports = route;

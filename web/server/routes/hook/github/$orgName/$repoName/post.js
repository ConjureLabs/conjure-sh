'use strict';

const Route = require('classes/Route');

const route = new Route();

route.push((req, res, next) => {
  const { orgName, repoName } = req.params;
  console.log(req.body);
});

module.exports = route;

const nextApp = require('../../../next');

const handlers = [];

handlers.push((req, res, next) => {
  nextApp.render(req, res, '/docs');
});

module.exports = handlers;

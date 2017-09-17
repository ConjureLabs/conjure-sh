const log = require('conjure-core/modules/log')('container logs');
const nextApp = require('../next');

// todo: fix `subdomainExpr` for non-development
const subdomainExpr = /^([\w\.]*)\.conjure\.dev(?!\w)/;
const containerLogsExpr = /^(\w+)\.(\w+)\.conjure\.dev(?!\w)/;

module.exports = (req, res, next) => {
  // if not a subdomain request, kick to next, unless www.
  const subdomainMatch = subdomainExpr.exec(req.headers.host);
  if (!subdomainMatch || subdomainMatch[1] === 'www') {
    return next();
  }

  const containerMatch = containerLogsExpr.exec(req.headers.host);
  if (!containerMatch) {
    return next();
  }

  const containerId = containerMatch[1];
  const subRoute = containerMatch[2];

  switch(subRoute) {
    case 'view':
      const viewHandler = require('./view.js');
      return viewHandler(req, res, containerId, next);

    case 'logs':
      const logsHandler = require('./logs.js');
      return logsHandler(req, res, containerId, next);

    default:
      return nextApp.render(req, res, '/_error');
  }
};

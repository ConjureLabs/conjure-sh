// todo: have owner restrictions, to lower billing, able to disallow anon tail logs
// todo: determine if public views should have logs exposed

const nextApp = require('../next');
const config = require('conjure-core/modules/config');
const log = require('conjure-core/modules/log')('container logs');

module.exports = async (req, res, containerRecord, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }

  const apiContainerLogs = require('conjure-api/server/routes/api/container/$containerUid/logs/get.js').call;
  const logsReq = await apiContainerLogs(req, {}, {
    containerUid: containerRecord.url_uid
  });

  // logsReq --> {"sessionKey":"d?neg%eDh2@u14P|4~~YRV@x~2j6h:P&S6n,4E%l9gc16?-TAoJK,-KG&@akqMR@"}

  if (!logsReq || !logsReq.sessionKey) {
    const { UnexpectedError } = require('@conjurelabs/err');
    return next(new UnexpectedError('No session key given for logs tailing'));
  }

  nextApp.render(req, res, '/container/logs', {
    sessionKey: logsReq.sessionKey,
    host: process.env.NODE_ENV === 'development' ? `//localhost:${config.app.worker.port}` : `${config.app.worker.protocol}//${logsReq.host}`,
    containerUid: containerRecord.url_uid
  });
};

// todo: have owner restrictions, to lower billing, able to disallow anon tail logs
// todo: determine if public views should have logs exposed

const config = require('conjure-core/modules/config');
const nextApp = require('../next');
const log = require('conjure-core/modules/log')('container logs');

module.exports = (req, res, containerRecord, next) => {
  const request = require('request');
  request({
    method: 'GET',
    url: `${config.app.api.url}/api/org/ConjureLabs/container/${containerRecord.url_uid}/logs`,
    json: true
  }, (err, logsRes, body) => {
    if (err) {
      return next(err);
    }

    if (logsRes.statusCode >= 400) {
      const nextDefaultGetHandler = nextApp.getRequestHandler();
      log.error(`API call for container logs, for container ${containerRecord.url_uid}, gave status code ${logRes.statusCode}`);
      return nextDefaultGetHandler(req, res);
    }

    console.log(body);

    // body --> {"sessionKey":"d?neg%eDh2@u14P|4~~YRV@x~2j6h:P&S6n,4E%l9gc16?-TAoJK,-KG&@akqMR@"}
    
    if (!body || !body.sessionKey) {
      const { UnexpectedError } = require('conjure-core/modules/err');
      return next(new UnexpectedError('No session key given for logs tailing'));
    }

    nextApp.render(req, res, '/container/logs', {
      sessionKey: body.sessionKey,
      host: body.host,
      containerUid: containerRecord.url_uid
    });
  });
};

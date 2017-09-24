// todo: have owner restrictions, to lower billing, able to disallow anon tail logs
// todo: determine if public views should have logs exposed

module.exports = (req, res, containerRecord, next) => {
  const request = require('request');
  request({
    method: 'GET',
    url: `http://conjure.dev:2999/api/org/ConjureLabs/container/${containerRecord.url_uid}/logs`,
    json: true
  }, (err, _, body) => {
    if (err) {
      return next(err);
    }

    // body --> {"sessionKey":"d?neg%eDh2@u14P|4~~YRV@x~2j6h:P&S6n,4E%l9gc16?-TAoJK,-KG&@akqMR@"}
    
    if (!body || !body.sessionKey) {
      const UnexpectedError = require('conjure-core/modules/err').UnexpectedError;
      return next(new UnexpectedError('No session key given for logs tailing'));
    }

    console.log(body);

    const nextApp = require('../next');
    nextApp.render(req, res, '/container/logs', {
      sessionKey: body.sessionKey,
      host: body.host,
      containerUid: containerRecord.url_uid
    });
  });
};

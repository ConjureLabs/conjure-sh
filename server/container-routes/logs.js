// todo: have owner restrictions, to lower billing, able to disallow anon tail logs
// todo: determine if public views should have logs exposed

module.exports = (req, res, containerRecord, next) => {
  // was successful, so start tailing logs
  res.send('SHOULD SEND LOGS NOW');

  const request = require('request');
  request.get(`http://conjure.dev:2999/api/org/ConjureLabs/container/${containerRecord.url_uid}/logs`, (err, _, body) => {
    // res.pipe(process.stdout);
    // res.on('end', function() {
    //   console.log('finished');
    // });
    res.send(body);
  });
};

// todo: have owner restrictions, to lower billing, able to disallow anon tail logs
// todo: determine if public views should have logs exposed

module.exports = (req, res, containerRecord, next) => {
  // was successful, so start tailing logs
  res.send('SHOULD SEND LOGS NOW');
};
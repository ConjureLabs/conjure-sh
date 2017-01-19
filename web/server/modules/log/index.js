module.exports = label => {
  return {
    log: console.log.bind(console.log, label || 'SentryCI'),
    info: console.info.bind(console.info, label || 'SentryCI'),
    dir: console.dir.bind(console.dir, label || 'SentryCI'),
    error: console.error.bind(console.error, label || 'SentryCI')
  };
};

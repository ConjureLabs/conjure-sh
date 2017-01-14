module.exports = label => {
  return {
    log: console.log.bind(console.log, label || 'CosmoCI'),
    info: console.info.bind(console.info, label || 'CosmoCI'),
    dir: console.dir.bind(console.dir, label || 'CosmoCI'),
    error: console.error.bind(console.error, label || 'CosmoCI')
  };
};

module.exports = label => {
  return {
    log: console.log.bind(console.log, label || 'Voyant'),
    info: console.info.bind(console.info, label || 'Voyant'),
    dir: console.dir.bind(console.dir, label || 'Voyant'),
    error: console.error.bind(console.error, label || 'Voyant'),
    timeStart: console.time.bind(console.time, label || 'Voyant'),
    timeEnd: console.time.bind(console.time, label || 'Voyant')
  };
};

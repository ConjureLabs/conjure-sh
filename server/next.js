// using this file to cache the next app in one export
const next = require('next');
const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

module.exports = app;

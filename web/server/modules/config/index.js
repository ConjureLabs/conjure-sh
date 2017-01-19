'use strict';

module.exports = {
  app: {
    host: `localhost:${process.env.PORT}`,
    protocol: 'http'
  },

  database: {
    pg: {
      user: 'sentry_admin',
      database: 'sentry',
      password: null,
      host: 'localhost',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000
    }
  },

  services: {
    github: {
      id: '6dd065500c5c86a9710c',
      secret: process.env.GITHUB_CLIENT_SECRET
    }
  }
};

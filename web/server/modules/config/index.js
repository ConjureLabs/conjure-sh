'use strict';

module.exports = {
  app: {
    host: `localhost:${process.env.PORT}`,
    protocol: 'http',
    publicHost: null // set later
  },

  database: {
    pg: {
      user: 'voyant_admin',
      database: 'voyant',
      password: null,
      host: 'localhost',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000
    }
  },

  services: {
    github: {
      id: 'a2f05da23445befbe47a',
      secret: process.env.GITHUB_CLIENT_SECRET,
      inboundWebhookScret: 'super secret secret'
    }
  }
};

module.exports.app.publicHost = process.env.VOYANT_APP_PUBLIC_HOST || module.exports.app.host;

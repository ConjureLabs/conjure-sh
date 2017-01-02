'use strict';

module.exports = {
  app: {
    host: `${process.env.APP_IP}:${process.env.PORT}`,
    protocol: 'http'
  },

  services: {
    github: {
      id: '6dd065500c5c86a9710c',
      secret: process.env.GITHUB_CLIENT_SECRET
    }
  }
};

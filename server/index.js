const express = require('express');
const next = require('next');
const path = require('path');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
})
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    // server.use(express.static(path.resolve(__dirname, '..', 'static')));

    server.get('/', (req, res) => {
      return app.render(req, res, '/landing', req.query);
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, err => {
      if (err) {
        throw err;
      }

      console.log('> Ready on http://localhost:3000');
    });
  });

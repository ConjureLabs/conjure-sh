'use strict';

const config = require('config');
const express = require('express');
const log = require('log')('routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('landing');
});

module.exports = router;

const express = require('express');
const baseRouter = require('./base');

const router = express.Router();

router.use('/', baseRouter);

module.exports = router;

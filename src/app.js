const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./logger');
const router = require('./router');

const app = express();

// security middleware
app.use(helmet());

// populate req.body on req object
app.use(bodyParser.json());

// log requests, response status and total req-res time
app.use(async (req, res, next) => {
  const startTime = Date.now();
  await next();
  const finishTime = Date.now();
  logger.info(`${res.statusCode} - ${req.method} ${req.url} - ${finishTime - startTime} ms`);
});

// inject router with all routes
app.use(router);

// error handling middleware
/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  logger.error(error);
  return res.status(500).send({ message: error.message });
});
/* eslint-enable no-unused-vars */

module.exports = app;

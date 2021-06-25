const winston = require('winston');
const { log: { level } } = require('./config');

/**
 * Creates a winston logger.
 * pulls log level from config.js, or defaults to info.
 * logs to console.
 * @type {winston.Logger}
 *
 */
const logger = winston.createLogger({
  level,
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level,
      colorize: true,
      timestamp: true,
    }),
  ],
  exitOnError: false,
});

module.exports = logger;

const mongoose = require('mongoose');
const logger = require('./logger');
const { mongo: { uri } } = require('./config');

const createConnection = async () => {
  let connection;
  try {
    connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    logger.info(`Mongoose: Connected to ${uri}`);
  } catch (error) {
    logger.error(error);
  }
  return connection;
};

module.exports = { createConnection };

const api = {
  name: process.env.API_NAME || 'MyRetail API',
  port: process.env.API_PORT || 8080,
};

const log = {
  level: process.env.LOG_LEVEL || 'info',
};

module.exports = {
  api,
  log,
};

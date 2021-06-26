const api = {
  name: process.env.API_NAME || 'MyRetail API',
  port: process.env.API_PORT || 8080,
};

const redSkyApi = {
  url: 'https://redsky.target.com/v3/pdp/tcin',
};

const log = {
  level: process.env.LOG_LEVEL || 'info',
};

const mongo = {
  uri: 'mongodb://localhost/myretail-db'
};

module.exports = {
  api,
  log,
  redSkyApi,
  mongo
};

const log = require('./logger');
const app = require('./app');
const { api: { port } } = require('./config');
const { createConnection } = require('./mongo');

const main = async () => {
  const connection = await createConnection();

  const server = app.listen(port, async () => {
    log.info(`listening on port ${port}!`);
  });

  // if deployed on kubernetes or other container platform, handle sigterms gracefully.
  process.on('SIGTERM', () => {
    log.debug('shutting down server');

    server.close(() => {
      log.info('Server gracefully shutdown.');
    });
    connection.close();
  });
};

main();

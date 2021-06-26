const log = require('./logger');
const app = require('./app');
const { api: { port } } = require('./config');
const { createConnection } = require('./mongo');

app.listen(port, async () => {
  await createConnection();
  log.info(`listening on port ${port}!`);
});

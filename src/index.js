const log = require('./logger');
const app = require('./app');
const { api: { port } } = require('./config');

app.listen(port, () => {
  log.info(`listening on port ${port}!`);
});

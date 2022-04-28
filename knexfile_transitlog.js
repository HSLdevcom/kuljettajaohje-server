const { PG_TRANSITLOG_CONNECTION_STRING } = require('./constants');

if (!PG_TRANSITLOG_CONNECTION_STRING) {
  throw new Error('PG_TRANSITLOG_CONNECTION_STRING variable is not set');
}

module.exports = {
  client: 'pg',
  connection: PG_TRANSITLOG_CONNECTION_STRING,
};

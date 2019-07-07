const config = require('./config');
const logger = require('./logger');
const server = require('./server');
const exchanges = require('./exchanges');

try {
  // create log
  const log = logger(config.log);
  log.app.debug('Логгировщик успешно создан.');

  // loading exchanges
  exchanges(log.exchange);

  // create server
  server(config.server.port, log.server);
  log.app.info(`Сервер успешно запущен на ${config.server.port} порту.`);
} catch (error) {
  console.log(`Ошибка запуска приложения: ${error.message} `);
}

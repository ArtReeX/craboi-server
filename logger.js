const log4js = require('log4js');

module.exports = (config) => {
  try {
    log4js.configure(config);
    return {
      app: log4js.getLogger('app'),
      server: log4js.getLogger('server'),
    };
  } catch (error) {
    throw new Error(`Ошибка создания логгировщика: ${error.message} `);
  }
};

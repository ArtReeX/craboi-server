const Binance = require('./Binance');

module.exports = (log) => {
  const binance = new Binance(log);
};

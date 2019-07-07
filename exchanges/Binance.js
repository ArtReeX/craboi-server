const axios = require('axios');

const API = {
  URL: 'https://poloniex.com/public?command=returnChartData',
  availableCurrencyPairs: ['BTC_XMR', 'BTC_EOS', 'BTC_ETH'],
  availablePeriods: [300, 900, 1800, 7200, 14400, 86400],
};

module.exports = class Poloniex {
  constructor(log) {
    // set log
    this.log = log;
    // create store
    this.chartData = [];
    // loading chart data
    this.loadChardData();
  }

  async loadChardData() {
    API.availableCurrencyPairs.forEach((pair) => {
      API.availablePeriods.forEach((period) => {
        axios
          .get(API.URL, {
            params: {
              currencyPair: pair,
              start: 1546300800,
              end: 1546646400,
              period,
            },
          })
          .then(({ data }) => {
            this.chartData.push({ pair, period, data });
          })
          .catch((error) => {
            this.log.error(
              `Невозможно загрузить данные Poloniex для пары ${pair}/${period}: ${error.message}.`,
            );
          });
      });
    });
  }
};

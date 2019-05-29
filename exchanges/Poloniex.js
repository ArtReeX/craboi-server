const axios = require('axios');

const API = {
  URL: 'https://poloniex.com/public?command=returnChartData',
  availableCurrencyPairs: ['BTC_XMR', 'BTC_EOS', 'BTC_ETH'],
  availablePeriods: [300, 900, 1800, 7200, 14400, 86400],
};

module.exports = class Poloniex {
  constructor() {
    // loading chart data
    this.loadChardData();
  }

  async loadChardData() {
    const promises = [];
    API.availableCurrencyPairs.forEach((pair) => {
      API.availablePeriods.forEach((period) => {
        promises.push(
          axios.get(API.URL, {
            params: {
              currencyPair: pair,
              start: 1546300800,
              end: 1546646400,
              period,
            },
          }),
        );
      });
    });

    this.chartData = await Promise.all(promises);
    console.log(JSON.stringify(this.chartData));
  }
};

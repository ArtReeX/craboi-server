const express = require('express');

module.exports = (port, log) => {
  try {
    // create app
    const app = express();

    // create middleware for json
    app.use(express.json());
    // create middleware for loging
    app.use((req, res, next) => {
      log.trace(
        `Входящий запрос типом ${req.method} метода ${req.path}, параметры: ${JSON.stringify(
          req.query,
        )}, данные: ${JSON.stringify(req.body)}.`,
      );
      next();
    });
    // creating a handler to get all the exchanges
    app.get('/API/getExchanges', (req, res) => {
      try {
        res.send('ok');
      } catch (error) {
        res.send(error.message);
      }
    });

    // server start
    app.listen(port || process.env.PORT);
  } catch (error) {
    throw new Error(`Не удалось запустить сервер: ${error}`);
  }
};

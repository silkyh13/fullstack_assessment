require("dotenv").config();
const User = require("../database/index").User;
const Transaction = require("../database/index").Transaction;
const axios = require("axios");
const fetch = require("node-fetch");

//compile the newest stock prices
const get = (userId, cb) => {
  //compile all the transactions made by user
  Transaction.findAll({
    where: {
      userId
    }
  }).then(transactions => {
    //categorize by ticker and quantity
    const tickerObject = transactions.reduce((tickers, transaction) => {
      tickers[transaction.ticker]
        ? (tickers[transaction.ticker] += transaction.quantity)
        : (tickers[transaction.ticker] = transaction.quantity);
      return tickers;
    }, {});
    const tickerArray = Object.keys(tickerObject);

    //returns object with ticker's information
    const requests = tickerArray.map(ticker => {
      return fetch(
        `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&filter=symbol,latestPrice&displayPercent=true&token=${process.env.CLOUD_API_KEY}`
      );
    });
    Promise.all(requests)
      .then(prices => {
        Promise.all(prices.map(price => price.json())).then(stocks => {
          const stockKey = Object.keys(stocks);
          //stockKey = [ '0', '1', '2', '3', '4' ]
          let formatted = stockKey.map(index => {
            //ticker symbol
            let ticker = Object.keys(stocks[stockKey[index]]);
            let stock = stocks[stockKey[index]][ticker].quote;
            stock.quantity = tickerObject[tickerArray[index]];
            return stock;
          });

          cb(null, formatted);
        });
      })
      .catch(err => cb(err));
  });
};

module.exports = {
  get
};

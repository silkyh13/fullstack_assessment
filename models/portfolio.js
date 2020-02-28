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
        Promise.all(prices.map(price => price.json())).then(prices => {
          const stockKey = Object.keys(prices);
          //stockKey = [ '0', '1', '2', '3', '4' ]
          let formatted = stockKey.map(index => {
            //ticker symbol
            let ticker = Object.keys(prices[stockKey[index]]);
            let stock = prices[stockKey[index]][ticker].quote;
            stock.quantity = tickerObject[tickerArray[index]];
            return stock;
          });

          cb(null, formatted);
        });
        // const currentPrices = prices.map((price, index) => {
        //   const stock = price.data["Global Quote"];
        //   const stockKeys = Object.keys(stock);
        //   return {
        //     ticker: tickerArray[index],
        //     price: stock[stockKeys[4]],
        //     quantity: tickerObject[tickerArray[index]],
        //     open: stock[stockKeys[1]]
        //   };
        // });

        // cb(null, currentPrices);
      })
      .catch(err => cb(err));

    //map through response and return new obj of ticker, current price, and quantity for each ticker
  });
};

module.exports = {
  get
};

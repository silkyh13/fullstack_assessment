require("dotenv").config();
const User = require("../database/index").User;
const Transaction = require("../database/index").Transaction;
const axios = require("axios");

// https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}

//compile the newest stock prices
const get = (userId, cb) => {
  //compile all the transactions made by user
  Transaction.findAll({
    where: {
      userId
    }
  }).then(transactions => {
    //categorize by ticker and quantity
    /*ex: tickerObject = {
      fb: 4,
      uber: 2
    }*/
    const tickerObject = transactions.reduce((tickers, transaction) => {
      tickers[transaction.ticker]
        ? (tickers[transaction.ticker] += transaction.quantity)
        : (tickers[transaction.ticker] = transaction.quantity);
      return tickers;
    }, {});
    const tickerArray = Object.keys(tickerObject);

    //returns object with ticker's information
    const prices = async () => {
      return await axios.all(
        tickerArray.map(ticker => {
          return axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`
          );
        })
      );
    };

    prices()
      .then(prices => {
        //map through response and return new obj of ticker, current price, and quantity for each ticker
        const currentPrices = prices.map((price, index) => {
          const stock = price.data["Global Quote"];
          const stockKeys = Object.keys(stock);
          return {
            ticker: tickerArray[index],
            price: stock[stockKeys[4]],
            quantity: tickerObject[tickerArray[index]]
          };
        });
        cb(null, currentPrices);
      })
      .catch(err => cb(err));
  });
};

module.exports = {
  get
};

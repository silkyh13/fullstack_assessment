require("dotenv").config();
const Transaction = require("../database/index").Transaction;
const axios = require("axios");

const buy = (ticker, qty, cb) => {
  let total = 0;
  let pps;
  axios
    .get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`
    )
    .then(res => {
      if (res.data["Global Quote"]) {
        pps = parseInt(res.data["Global Quote"]["05. price"]);
        total = qty * pps;
      } else {
        cb(undefined);
      }
    });

  //get user by id
  let balance;
  axios
    .get("/api/user")
    .then(res => {
      balance = res.data.balance;
    })
    .catch(err => console.error(err));
  //check balance
  if (balance >= total) {
    //make the purchase ticker,cost,quantity
    Transaction.create({
      ticker: ticker,
      cost: pps,
      quantity: qty
    })
      .then(res => {
        cb(null, res);
      })
      .catch(err => {
        cb(err);
      });
  } //return error
};

module.exports = {
  buy
};

require("dotenv").config();
const Transaction = require("../database/index").Transaction;
const User = require("../database/index").User;
const axios = require("axios");
//buy function for ticker
const buy = (ticker, quantity, user, cb) => {
  if (!Number.isInteger(parseFloat(quantity))) {
    cb("Not an integer");
  } else {
    axios
      .get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=${process.env.API_KEY}`
      )
      .then(res => {
        if (res.data["Global Quote"]) {
          const stock = res.data["Global Quote"];
          const stockKeys = Object.keys(stock);
          //if there is not enough to purchase stocks in user balance
          if (user.balance < stock[stockKeys[4]] * quantity) {
            cb(null, "Not enough money in account");
          } else {
            //there is enough money in balance to create transaction
            Transaction.create({
              ticker: stock[stockKeys[0]],
              cost: stock[stockKeys[4]] * 1000,
              quantity,
              userId: user.id
            })
              .then(transaction => {
                //if transaction was successfully created, set new balance where id = user.id

                cb(null, transaction);
                User.update(
                  {
                    balance:
                      ((user.balance / 1000).toFixed(2) -
                        (transaction.cost / 1000).toFixed(2) *
                          transaction.quantity) *
                      1000
                  },
                  {
                    where: {
                      id: user.id
                    }
                  }
                ).catch(err => cb(err));
              })
              .catch(err => {
                cb(err);
              });
          }
        } else {
          //if ticker does not exist
          cb(null, "Ticker does not exist.");
        }
      });
  }
};
//get all transactions for user who is logged in
//select * from transactions where userId={userId}
const get = (userId, cb) => {
  const transactions = Transaction.findAll({
    where: {
      userId
    }
  })
    .then(transactions => {
      cb(null, transactions.reverse());
    })
    .catch(err => {
      cb(err);
    });
};
module.exports = {
  buy,
  get
};

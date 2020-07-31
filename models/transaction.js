require("dotenv").config();
const Transaction = require("../database/index").Transaction;
const User = require("../database/index").User;
const axios = require("axios");
//buy function for ticker
const buy = (ticker, quantity, user, cb) => {
  if (!Number.isInteger(parseFloat(quantity))) {
    cb("Not Valid");
  } else {
    axios
      .get(
        `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${ticker}&types=quote&filter=symbol,latestPrice,open&displayPercent=true&token=${process.env.CLOUD_API_KEY}`
      )
      .then(res => {
        let stock = res.data;

        let stockKey = Object.keys(res.data);
        let stockKeyInfo = stock[stockKey[0]].quote;
        console.log(typeof (stockKeyInfo.latestPrice * quantity));
        if (user.balance / 1000 < stockKeyInfo.latestPrice * quantity) {
          cb(null, "Not enough money in account");
        } else {
          //there is enough money in balance to create transaction
          Transaction.create({
            ticker: stockKeyInfo.symbol,
            cost: stockKeyInfo.latestPrice * 1000,
            quantity,
            open: stockKeyInfo.open || 0,
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
      })
      .catch(err => {
        cb(err);
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

const transactions = require("../models/transaction");

const buy = (req, res) => {
  transactions.buy(
    req.body.ticker,
    req.body.quantity,
    req.user,
    (err, response) => {
      if (err === "Ticker does not exist.") {
        res.send(err);
      } else if (err) {
        res.status(500).send(err);
      }
      res.send(response);
    }
  );
};

const get = (req, res) => {
  transactions.get(req.user.id, (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(response);
  });
};

module.exports = {
  buy,
  get
};

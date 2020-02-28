const portfolio = require("../models/portfolio");

const get = (req, res) => {
  portfolio.get(req.user.id, (err, response) => {
    if (err) {
      res.status(500).send(err);
    }
    res.send(response);
  });
};

module.exports = {
  get
};

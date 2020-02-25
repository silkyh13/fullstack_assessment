const models = require("../models/user");

const registerUser = (req, res) => {
  models.registerUser(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
    (err, response) => {
      if (err) {
        res.status(500).send(err);
      }
      res.send(response);
    }
  );
};

const getUser = (req, res) => {
  req.user ? res.send(req.user) : res.send(null);
};
module.exports = {
  registerUser,
  getUser
};

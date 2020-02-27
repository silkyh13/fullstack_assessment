const User = require("../database/index").User;
const bcrypt = require("bcrypt");

const registerUser = (firstName, lastName, email, password, cb) => {
  bcrypt
    .hash(password, 10)
    .then(hash => {
      User.create({
        firstName,
        lastName,
        email,
        password: hash,
        balance: 5000000
      })
        .then(user => {
          cb(null, user);
        })
        .catch(err => cb(err));
    })
    .catch(err => cb(err));
};
const validatePassword = (plainTextPassword, hash, cb) => {
  bcrypt
    .compare(plainTextPassword, hash)
    .then(res => {
      cb(null, res);
      console.log(res, "validated mann");
    })
    .catch(err => cb(err));
};

module.exports = {
  registerUser,
  validatePassword
};

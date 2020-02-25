const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../database/index").User;
const validatePassword = require("../models/user").validatePassword;

passport.use(
  new LocalStrategy({ usernameField: "email" }, function(
    email,
    password,
    done
  ) {
    User.findOne({
      where: { email }
    }).then(user => {
      if (!user) {
        return done(null, false, { message: "Incorrect password." });
      }
      validatePassword(password, user.dataValues.password, (err, res) => {
        if (err) {
          return done(null, err);
        }
        if (res) {
          return done(null, user);
        }
        return done(null, false, { message: "Incorrect password." });
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({
    where: { id }
  })
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

module.exports = passport;

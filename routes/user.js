const router = require("express").Router();
const User = require("../controllers/user");
const passport = require("../passport");
//registering users
router.post("/user", User.registerUser);
//authenticating users
router.post("/login", passport.authenticate("local"), (req, res) => {
  res.end();
});

router.get("/logout", (req, res) => {
  req.logout();
  res.end("User logged out");
});

//get all users
router.get("/user", User.getUser);

module.exports = router;

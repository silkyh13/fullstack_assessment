const router = require("express").Router();
const portfolio = require("../controllers/portfolio");

router.get("/portfolio", portfolio.get);

module.exports = router;

const router = require("express").Router();
const transactions = require("../controllers/transaction");

router.get("/transaction", transactions.get);
router.post("/transaction", transactions.buy);

module.exports = router;

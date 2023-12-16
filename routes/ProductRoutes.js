const router = require("express").Router();
const { authentication } = require("../middleware/auth");
const transactionController = require("../controllers/transactionController");

router.post("/", authentication, transactionController.postTransaction);
router.get("/admin", authentication, transactionController.getAllTransactions);
router.get("/user", authentication, transactionController.getUserTransactions);
router.get("/:transactionId", authentication, transactionController.getTransactionById);
module.exports = router;
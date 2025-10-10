const express = require("express");
const router = express.Router();
const discountController = require("../controllers/discountController");

router.get("/", discountController.getAll);
router.post("/", discountController.create);
router.put("/:id", discountController.update);
router.delete("/:id", discountController.remove);

module.exports = router;

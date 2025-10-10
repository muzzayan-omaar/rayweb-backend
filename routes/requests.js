const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");

router.get("/", requestController.getAll);
router.post("/", requestController.create);
router.put("/:id", requestController.update);
router.delete("/:id", requestController.remove);

module.exports = router;

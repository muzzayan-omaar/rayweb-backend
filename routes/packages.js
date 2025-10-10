const express = require("express");
const router = express.Router();
const packageController = require("../controllers/packageController");
const auth = require("../middleware/auth");

// Protect all routes
router.use(auth);

router.get("/", packageController.getAll);
router.post("/", packageController.create);
router.put("/:id", packageController.update);
router.delete("/:id", packageController.remove);

module.exports = router;

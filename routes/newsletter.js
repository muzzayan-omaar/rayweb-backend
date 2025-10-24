const express = require("express");
const router = express.Router();
const {
  subscribeNewsletter,
  getAllSubscribers,
  deleteSubscriber,
} = require("../controllers/newsletterController");

// Public route
router.post("/", subscribeNewsletter);

// Admin routes
router.get("/", getAllSubscribers);
router.delete("/:id", deleteSubscriber);

module.exports = router;

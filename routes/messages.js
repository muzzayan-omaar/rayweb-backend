const express = require("express");
const router = express.Router();
const { getMessages, replyMessage } = require("../controllers/contactController");

// GET all messages
router.get("/", getMessages);

// POST reply to a message
router.post("/reply", replyMessage);

module.exports = router;

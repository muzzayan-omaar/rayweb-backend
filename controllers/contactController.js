// controllers/contactController.js
const Contact = require("../models/Contact");
const sendMail = require("../utils/mailer");

// ===============================
// POST /api/contact  (Public)
// ===============================
exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = await Contact.create({ name, email, subject, message });

    res.status(201).json({ success: true, message: "Message received", data: newMessage });
  } catch (err) {
    console.error("❌ submitContact error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

// ===============================
// GET /api/admin/messages  (Admin)
// ===============================
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    console.error("❌ getMessages error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ===============================
// POST /api/admin/messages/reply  (Admin)
// ===============================
exports.replyMessage = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message)
      return res.status(400).json({ error: "Missing email or message" });

    await sendMail({
      to,
      subject: "Reply from RayWebSolutions",
      text: message,
    });

    res.json({ success: true, message: "Reply sent" });
  } catch (err) {
    console.error("❌ replyMessage error:", err);
    res.status(500).json({ error: "Failed to send reply" });
  }
};

// controllers/contactController.js
const Contact = require("../models/Contact");
const sendMail = require("../utils/mailer");

// Get all messages (for admin)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch messages." });
  }
};

exports.submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // Send an email notification (optional)
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Email: ${email}\nSubject: ${subject}\nMessage:\n${message}`,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send message." });
  }
};

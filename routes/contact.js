// routes/contact.js
const express = require("express");
const router = express.Router();
const sendMail = require("../mailer");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  const html = `
    <h3>New Contact Submission</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  const result = await sendMail("youremail@yourdomain.com", "New Contact Message", html);

  if (result.success) res.json({ status: "Email sent successfully!" });
  else res.status(500).json({ error: result.error.message });
});

module.exports = router;

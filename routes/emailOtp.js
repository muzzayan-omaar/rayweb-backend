const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let currentOtp = "";

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  currentOtp = Math.floor(100000 + Math.random() * 900000).toString();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.MAIL_USER,
    to: email,
    subject: "Your Email Verification Code",
    html: `<h3>Your OTP is: ${currentOtp}</h3>`
  });

  res.json({ message: "OTP sent" });
});

router.post("/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === currentOtp) return res.json({ verified: true });
  return res.status(401).json({ verified: false });
});

module.exports = router;

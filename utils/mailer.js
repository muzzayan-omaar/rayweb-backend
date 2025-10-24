// utils/mailer.js
const axios = require("axios");

const sendMail = async ({ to, subject, text, html }) => {
  try {
    const res = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: { email: process.env.FROM_EMAIL, name: "RayWebSolutions" },
        to: [{ email: to }],
        subject,
        textContent: text,
        htmlContent: html || text,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`✅ Email sent to ${to}`, res.data);
  } catch (err) {
    console.error("❌ Email sending failed:", err.response?.data || err.message);
  }
};

module.exports = sendMail;

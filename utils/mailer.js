// utils/mailer.js
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async ({ to, subject, text, html }) => {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL, // must match verified sender in SendGrid
      subject,
      text,
      html,
    });
    console.log(`✅ Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending email:", err.response?.body || err.message);
  }
};

module.exports = sendMail;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// optional: verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Mailer connection failed:", error);
  } else {
    console.log("✅ Mailer ready to send messages");
  }
});

const sendMail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"RayWebSolutions" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html: html || text, // fallback
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (err) {
    console.error("❌ Error sending mail:", err);
  }
};

module.exports = sendMail;

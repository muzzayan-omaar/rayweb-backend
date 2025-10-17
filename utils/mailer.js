// utils/mailer.js
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async ({ to, subject, text, html }) => {
  try {
    await resend.emails.send({
      from: "RayWebSolutions <onboarding@resend.dev>", // or your domain later
      to,
      subject,
      html: html || `<p>${text}</p>`,
    });
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error("❌ Error sending email:", error);
  }
};

module.exports = sendMail;

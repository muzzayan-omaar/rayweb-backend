const Newsletter = require("../models/Newsletter");
const EmailTemplate = require("../models/EmailTemplate");
const EmailLog = require("../models/EmailLog");
const sendMail = require("../utils/mailer");

// Subscribe
exports.subscribeNewsletter = async (req, res) => {
  const { email, name } = req.body;

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "You are already subscribed." });

    const newSubscriber = new Newsletter({ email, name });
    await newSubscriber.save();

    // Send confirmation email
    await sendMail({
      to: email,
      subject: "🎉 Subscription Confirmed",
      text: "Thank you for subscribing to RayWebSolutions newsletter!",
    });

    res.status(200).json({ message: "Subscribed successfully! Check your inbox." });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// Send mass newsletter
exports.sendNewsletter = async (req, res) => {
  const { subject, htmlBody, recipientEmails } = req.body; // recipientEmails: array or "all"

  try {
    let recipients = [];

    if (recipientEmails === 'all') {
      const subs = await Newsletter.find({ status: 'active' });
      recipients = subs.map(sub => sub.email);
    } else {
      recipients = recipientEmails;
    }

    const results = [];
    for (const email of recipients) {
      try {
        await sendMail({ to: email, subject, html: htmlBody });
        results.push({ email, status: 'sent' });
      } catch (err) {
        results.push({ email, status: 'failed', error: err.message });
      }
    }

    // Save log
    await EmailLog.create({
      subject,
      body: htmlBody,
      recipients,
      status: results.every(r => r.status === 'sent') ? 'sent' : 'failed',
      error: results.filter(r => r.status === 'failed').map(r => r.error).join('; '),
    });

    res.status(200).json({ message: "Newsletter sent.", results });
  } catch (error) {
    console.error("Mass newsletter error:", error);
    res.status(500).json({ message: "Server error. Could not send newsletter." });
  }
};

// Get all subscribers (Admin)
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Could not fetch subscribers." });
  }
};

// Delete subscriber (Admin)
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Newsletter.findByIdAndDelete(id);
    res.status(200).json({ message: "Subscriber removed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error. Could not delete subscriber." });
  }
};

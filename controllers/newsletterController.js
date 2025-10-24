// controllers/newsletterController.js
const Newsletter = require("../models/Newsletter");
const sendMail = require("../utils/mailer");

exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // Check existing
    const existing = await Newsletter.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "You are already subscribed." });

    // Save subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // Send confirmation email to subscriber
    await sendMail({
      to: email,
      subject: "🎉 You're Subscribed to RayWebSolutions!",
      html: `
        <h2>Welcome to RayWebSolutions!</h2>
        <p>Thank you for subscribing to our newsletter. Stay tuned for updates, web design tips, and more!</p>
      `,
    });

    // Send notification email to admin
    await sendMail({
      to: process.env.EMAIL_USER,
      subject: "📩 New Newsletter Subscriber!",
      text: `New subscriber: ${email}`,
    });

    res.status(200).json({
      message: "Subscribed successfully! Check your email inbox.",
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

// Fetch all subscribers (admin)
exports.getAllSubscribers = async (req, res) => {
  try {
    const subs = await Newsletter.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subscribers" });
  }
};

// Delete subscriber (admin)
exports.deleteSubscriber = async (req, res) => {
  try {
    await Newsletter.findByIdAndDelete(req.params.id);
    res.json({ message: "Subscriber deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subscriber" });
  }
};

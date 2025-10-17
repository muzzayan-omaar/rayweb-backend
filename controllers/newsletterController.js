const Newsletter = require("../models/Newsletter");
const sendMail = require("../utils/mailer");

// Subscribe
exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "You are already subscribed." });

    // Save new subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // ✅ Send confirmation email
    await sendMail({
      to: email,
      subject: "🎉 Subscription Confirmed",
      text: "Thank you for subscribing to RayWebSolutions newsletter!",
    });

    res
      .status(200)
      .json({ message: "Subscribed successfully! Check your inbox." });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

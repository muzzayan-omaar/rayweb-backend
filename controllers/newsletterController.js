const Newsletter = require("../models/Newsletter");
const sendMail = require("../utils/mailer");

// Subscribe
exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    // 1️⃣ Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "You are already subscribed." });

    // 2️⃣ Save new subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // 3️⃣ Send confirmation email to subscriber
    await sendMail({
      to: email,
      subject: "🎉 Subscription Confirmed - RayWebSolutions",
      text: "Thank you for subscribing to RayWebSolutions! You'll now receive updates, news, and offers straight to your inbox.",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>🎉 Welcome to RayWebSolutions!</h2>
          <p>Thank you for subscribing to our newsletter.</p>
          <p>You'll now receive updates, offers, and the latest project news right in your inbox.</p>
          <p>Cheers,<br/><strong>RayWebSolutions Team</strong></p>
        </div>
      `
    });

    // 4️⃣ Send notification email to admin
    await sendMail({
      to: process.env.SENDGRID_FROM_EMAIL, // your Gmail or admin email
      subject: "📩 New Newsletter Subscriber",
      text: `New subscriber: ${email}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h3>📢 New Subscriber Alert!</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `
    });

    // 5️⃣ Respond to frontend
    res.status(200).json({ message: "Subscribed successfully! Check your inbox for confirmation." });

  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
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

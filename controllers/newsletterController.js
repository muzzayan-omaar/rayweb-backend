const Newsletter = require('../models/Newsletter');
const nodemailer = require('nodemailer');

// Subscribe
exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;
  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: 'You are already subscribed.' });

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"RayWebSolutions" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Subscription Confirmed",
      html: `<p>Thank you for subscribing to our newsletter! 🎉</p>`,
    });

    res.status(200).json({ message: 'Subscribed successfully! Check your email.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

// Get all subscribers (Admin)
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not fetch subscribers.' });
  }
};

// Delete subscriber (Admin)
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Newsletter.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subscriber removed.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not delete subscriber.' });
  }
};

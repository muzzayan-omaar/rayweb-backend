const Newsletter = require('../models/Newsletter');

exports.subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Newsletter.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'You are already subscribed.' });
    }

    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();
    res.status(200).json({ message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

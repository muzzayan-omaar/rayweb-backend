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
    console.error(error); // <- always log for debugging
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

// Fetch all subscribers
exports.getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

// Delete a subscriber
exports.deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;
    await Newsletter.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subscriber removed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Try again later.' });
  }
};

const Payment = require('../models/Payment');

exports.recordPayment = async (req, res) => {
  const { name, email, amount, method, transactionId, status } = req.body;

  try {
    const payment = new Payment({ name, email, amount, method, transactionId, status });
    await payment.save();
    res.status(200).json({ message: 'Payment recorded successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error recording payment.' });
  }
};

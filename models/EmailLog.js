// models/EmailLog.js
const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  body: { type: String, required: true },
  recipients: [String],     // Array of email addresses
  status: { type: String, enum: ['sent', 'failed'], default: 'sent' },
  error: { type: String },  // If failed
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailLog', emailLogSchema);

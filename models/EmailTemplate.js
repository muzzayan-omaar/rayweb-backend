// models/EmailTemplate.js
const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },      // Template name
  subject: { type: String, required: true },
  htmlBody: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);

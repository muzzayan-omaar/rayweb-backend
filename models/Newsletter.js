// models/Newsletter.js
const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    name:{
      type: String,
    },
    status:{
      type: String,
      enum: ['active', 'unsubscribed'],
      default: 'activate',
    },
    subscribedAt: {
    type: Date,
    default: Date.now,
  },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Newsletter", newsletterSchema);

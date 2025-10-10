const mongoose = require("mongoose");

const DiscountSchema = new mongoose.Schema({
  title: { type: String, required: true },
  percentage: { type: Number, required: true },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Discount", DiscountSchema);

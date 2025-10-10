const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    formerPrice: { type: Number, default: null }, // optional crossed price
    features: { type: [String], required: true },
    collapsible: { type: [String], default: [] },
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);

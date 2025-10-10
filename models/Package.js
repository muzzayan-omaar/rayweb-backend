const mongoose = require("mongoose");

const PackageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    formerPrice: { type: Number, default: null },
    features: { type: [String], required: true },
    extraFeatures: { type: [String], default: [] }, // was collapsible
    popular: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Package", PackageSchema);

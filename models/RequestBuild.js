const mongoose = require("mongoose");

const RequestBuildSchema = new mongoose.Schema({
  name: String,
  email: String,
  projectType: String,
  details: String,
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("RequestBuild", RequestBuildSchema);

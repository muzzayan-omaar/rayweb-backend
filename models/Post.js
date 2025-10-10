const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: String,
  description: String,
  link: String,
  extra: String,
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);

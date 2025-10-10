const Package = require("../models/Package");

// GET all packages
exports.getAll = async (req, res) => {
  try {
    const packages = await Package.find().sort({ popular: -1, price: 1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const { name, price, formerPrice, features, extraFeatures, popular } = req.body;

    if (!name || !price || !features || !features.length) {
      return res.status(400).json({ error: "Name, price, and at least one feature are required" });
    }

    const pkg = new Package({ name, price, formerPrice, features, extraFeatures, popular });
    await pkg.save();
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { name, price, formerPrice, features, extraFeatures, popular } = req.body;

    if (features && !Array.isArray(features)) {
      return res.status(400).json({ error: "Features must be an array" });
    }

    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      { name, price, formerPrice, features, extraFeatures, popular },
      { new: true, runValidators: true }
    );

    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const pkg = await Package.findByIdAndDelete(req.params.id);
    if (!pkg) return res.status(404).json({ error: "Package not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

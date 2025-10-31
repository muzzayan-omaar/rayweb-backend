const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");

// Register admin (use once to create an account)
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ email, password: hashedPassword, name });
    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login admin
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, admin });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Verify middleware
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.admin = decoded;
    next();
  });
};

module.exports = { router, verifyAdmin };

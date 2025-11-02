const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

dotenv.config();
const app = express();

// ✅ Setup CORS for both frontend (Vercel) and local dev
app.use(
  cors({
    origin: ["https://raywebsolutions.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Stripe webhook route (keep before JSON parsing)
app.use("/api/payment/webhook", require("./routes/webhook"));

// ✅ Email OTP route
app.use("/api/email", require("./routes/emailOtp"));

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect to MongoDB
require("./config/db")();

// ✅ Public Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/newsletter", require("./routes/newsletter"));
app.use("/api/payment", require("./routes/payment"));


app.use(helmet());
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 60 }); // 60 requests / min
app.use(limiter);

// ✅ Admin Authentication Route
const { router: adminAuthRouter, verifyAdmin } = require("./routes/adminAuth");
app.use("/api/admin/auth", adminAuthRouter);

// ✅ Protected Admin Routes (secured by token middleware)
app.use("/api/admin/posts", verifyAdmin, require("./routes/posts"));
app.use("/api/admin/packages", verifyAdmin, require("./routes/packages"));
app.use("/api/admin/messages", verifyAdmin, require("./routes/messages"));


// ❌ Commented routes for later expansion
// app.use("/api/admin/subscriptions", verifyAdmin, require("./routes/subscriptions"));
 app.use("/api/admin/messages", verifyAdmin, require("./routes/messages"));
// app.use("/api/admin/reviews", verifyAdmin, require("./routes/reviews"));
// app.use("/api/admin/requests", verifyAdmin, require("./routes/requests"));
// app.use("/api/admin/discounts", verifyAdmin, require("./routes/discounts"));

// ✅ Fallback route
app.get("/", (req, res) => {
  res.send("✅ RayWebSolutions Backend API is running...");
});

// ✅ Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

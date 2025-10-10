const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// ✅ Setup CORS to allow Vercel and localhost during development
app.use(
  cors({
    origin: ["https://raywebsolutions.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Stripe webhook route (must be before express.json to handle raw body if needed)
app.use("/api/payment/webhook", require("./routes/webhook"));

// ✅ Email OTP
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

// ✅ Admin Routes (only those built so far)
app.use("/api/admin/posts", require("./routes/posts"));
app.use("/api/admin/packages", require("./routes/packages"));

// ❌ Commented out — to be added later when ready
// app.use("/api/admin/subscriptions", require("./routes/subscriptions"));
// app.use("/api/admin/messages", require("./routes/messages"));
// app.use("/api/admin/reviews", require("./routes/reviews"));
// app.use("/api/admin/requests", require("./routes/requests"));
// app.use("/api/admin/discounts", require("./routes/discounts"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

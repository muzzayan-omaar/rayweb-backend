// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const contactRoute = require("./routes/contact");
const paymentRoute = require("./routes/payment");

app.use("/api/contact", contactRoute);
app.use("/api/payment", paymentRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

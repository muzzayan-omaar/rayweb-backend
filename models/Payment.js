// routes/payment.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const Payment = require("../models/Payment"); // import your Payment schema

router.post("/checkout", async (req, res) => {
  const { name, amount, customer, templateId, plan } = req.body;

  try {
    // Save the payment intent info to DB (initially pending)
    const payment = await Payment.create({
      name: customer.companyName,
      email: customer.email,
      amount,
      method: "Card",
      status: "pending",
    });

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${templateId} - ${plan}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        paymentId: payment._id.toString(), // useful for updating status later
        email: customer.email,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

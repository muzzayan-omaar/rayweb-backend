// routes/webhook.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Payment = require("../models/Payment");
const sendMail = require("../utils/mailer");

router.post("/webhook", express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      const paymentId = session.metadata.paymentId;

      await Payment.findByIdAndUpdate(paymentId, {
        status: "successful",
        transactionId: session.payment_intent,
      });

      // Send confirmation email
      await sendMail(
        session.metadata.email,
        "Payment Received - Raywebsolutions",
        `<h2>Thanks for your deposit!</h2>
        <p>Your payment has been received successfully. We’ll begin processing your order shortly.</p>`
      );

      console.log("✅ Payment updated & email sent.");
    } catch (error) {
      console.error("Error handling successful payment:", error.message);
    }
  }

  res.json({ received: true });
});

module.exports = router;

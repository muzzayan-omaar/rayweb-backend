// routes/payment.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
  const { name, amount, customer, isVerified, templateId, plan } = req.body;

  // ✅ 1. Check for verification
  if (!isVerified) {
    return res.status(401).json({ error: "User is not verified via OTP." });
  }

  try {
    // ✅ 2. Optionally, save customer info to database here (future)

    // ✅ 3. Create Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${templateId} - ${plan} plan`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://raywebsolutions.vercel.app/success",
      cancel_url: "https://raywebsolutions.vercel.app/cancel",
      metadata: {
        company: customer?.companyName,
        email: customer?.email,
        phone: customer?.phone,
        industry: customer?.industry,
      },
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err.message);
    res.status(500).json({ error: "Payment initiation failed." });
  }
});

module.exports = router;

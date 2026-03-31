import express from "express";
import authMiddleware from "../middleware/auth.js";
import Stripe from "stripe";
import User from "../models/User.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create Checkout Session
router.post("/create-session", authMiddleware, async (req, res) => {
  const { plan } = req.body; // "free", "premium"
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: plan === "premium" ? "price_id_here" : "price_free_id",
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.FRONTEND_URL}/dashboard`,
    cancel_url: `${process.env.FRONTEND_URL}/dashboard`,
  });
  res.json({ url: session.url });
});

// Stripe webhook to confirm payment
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userEmail = session.customer_email;
      const user = await User.findOne({ email: userEmail });
      if (user) {
        user.plan = "premium";
        user.credits += 50; // add extra credits
        await user.save();
      }
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
});

export default router;
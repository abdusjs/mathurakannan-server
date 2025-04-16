import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 📌 Monthly payment
export const createSubscription = async (req, res) => {
  const { amount, customerName, email, packageName } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      metadata: { customerName, email, packageName },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

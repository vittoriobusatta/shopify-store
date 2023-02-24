const express = require("express");
const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST_KEY, {
  apiVersion: "2022-11-15",
});

const router = express.Router();

const domain = "localhost:3000";

router.post("/create-checkout-session", async (req, res) => {
  const { items, checkoutId } = req.body;
  const lineItems = items.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.title,
          images: [item.images.url],
          metadata: {
            handle: item.handle,
            id: item.id,
          },
        },
        unit_amount: item.variantPrice * 100,
      },
      quantity: item.variantQuantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["RE"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "eur" },
          display_name: "Free shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 7 },
          },
        },
      },
    ],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://${domain}/cancel`,
    client_reference_id: checkoutId,
  });

  res.send({ url: session.url });
});

// Stripe webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret =
  "whsec_6dbb49a7e6e2709cadc4b7e7d8e130f84c4eaff6831b3c92e68f73a81603a0e3";

router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    console.log("🔔 Payment received!");
    const { object } = req.body.data;
    const session = await stripe.checkout.sessions.retrieve(object.id);
    await stripe.customers.create({
      email: session.customer_details.email,
      name: session.customer_details.name,
    });
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
});

module.exports = router;

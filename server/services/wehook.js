const stripeApi = require("../api/stripe");
const dotenv = require("dotenv");

dotenv.config();

let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// crée une fonction de webhook
async function webhook(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeApi.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    console.log("🔔 Payment received!");
    const { object } = req.body.data;
    const session = await stripeApi.checkout.sessions.retrieve(object.id);
    await stripeApi.customers.create({
      email: session.customer_details.email,
      name: session.customer_details.name,
    });
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}

module.exports = webhook;

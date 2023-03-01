const stripeApi = require("../api/stripe");
const dotenv = require("dotenv");
const createOrderFromStripe = require("../controllers/orders");

dotenv.config();

let endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// crée une fonction de webhook
async function webhook(req, res) {
  const payload = req.rawBody;
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeApi.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    console.log("🔔 Payment received!");
    const checkoutSession = event.data.object;

    // Créer la commande depuis Stripe
    await createOrderFromStripe({
      body: checkoutSession,
    });
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
}

module.exports = webhook;

const Stripe = require("stripe");

const stripeApi = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST_KEY, {
  apiVersion: "2022-11-15",
});

module.exports = stripeApi;

const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripeApi = new Stripe(process.env.STRIPE_SECRET_TEST_KEY, {
  apiVersion: "2022-11-15",
});

module.exports = stripeApi;

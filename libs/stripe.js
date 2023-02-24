import Stripe from "stripe";
const domain = "localhost:3000";
// const domain = process.env.SHOPIFY_STORE_DOMAIN;

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_TEST_KEY, {
  apiVersion: "2022-11-15",
});

export const configureStripeClient = () => {
  return stripe;
};

export const createStripeCheckoutSession = async (checkoutId, cartItems) => {
  try {
    const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: "eur",
          product_data: {
            name: item.title,
            images: [item.images.url],
          },
          unit_amount: item.variantPrice * 100,
        },
        quantity: item.variantQuantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
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
      mode: "payment",
      success_url: `http://${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://${domain}/cart`,
      client_reference_id: checkoutId,
    });

    return session.url;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const createStripeCustomer = async (customerEmail) => {
  try {
    const customer = await stripe.customers.create({
      email: customerEmail,
    });

    return customer;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

export const getStripePaymentIntent = async (paymentIntentId) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};

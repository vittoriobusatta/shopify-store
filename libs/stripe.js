const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST_KEY);
const domain = process.env.SHOPIFY_STORE_DOMAIN;

export async function createStripeSession(checkoutId, lineItems) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems.map((item) => {
        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: item.title,
            },
            unit_amount: item.variantPrice * 100,
          },
          quantity: item.variantQuantity,
        };
      }),
      shipping_address_collection: {
        allowed_countries: ['RE'] // Pays autorisés pour la livraison
      },
      mode: "payment",
      success_url: `https://${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://${domain}/cart`,
      client_reference_id: checkoutId,
    });
    return session.url;
  } catch (err) {
    console.error(err);
    return null;
  }
}

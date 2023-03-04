import stripeClient from "libs/stripe";

// const domain = process.env.CLIENT_HOSTNAME;
const domain = process.env.NEXT_PUBLIC_CLIENT_HOSTNAME_LOCAL;

async function createCheckoutSession(req, res) {
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

  if (lineItems.length === 0) {
    res.status(400).json({ message: "No items in cart" });
    return;
  }

  if (!checkoutId) {
    res.status(400).json({ message: "No checkout id" });
    return;
  }

  try {
    const session = await stripeClient.checkout.sessions.create({
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
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cart`,
      client_reference_id: checkoutId,
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default createCheckoutSession;
import stripeClient from "../../../libs/stripe";

// const domain = process.env.NEXT_PUBLIC_CLIENT_HOSTNAME;
const domain = "http://localhost:3000";

async function createCheckoutSession(req, res) {
  const { items, cartId } = req.body;
  const lineItems = items.map((item) => {
    const { title } = item.item;
    const { price, image } = item.line.node.merchandise;
    const { quantity } = item.line.node;
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: title,
          images: [
            image.url,
          ],
        },
        unit_amount: price.amount * 100,
      },
      quantity: quantity,
    };
  });

  if (lineItems.length === 0) {
    res.status(400).json({ message: "No items in cart" });
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
      metadata: {
        cartId: cartId,
      },
    });

    res.status(200).json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default createCheckoutSession;
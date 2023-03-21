const axios = require("axios");

const DOMAIN_NAME = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const API_KEY = process.env.NEXT_PUBLIC_SHOPIFY_SHOPIFY_ADMIN_API_KEY;
const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_VERSION;
const endpoint = "orders";

async function createShopifyOrder(order) {
  try {
    const url = `https://${API_KEY}:${API_TOKEN}@${DOMAIN_NAME}/admin/api/${API_VERSION}/${endpoint}.json`;
    const response = await axios.post(url, { order });
    return response.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function handler(req, res) {
  const { orderData, cartData } = req.body;
  const {
    customer_details,
    shipping_details,
    amount_subtotal,
    payment_status,
  } = orderData;

  // if (orderData.length === 0 && isOrderCreated === true) {
  //   console.log("Commande déjà créée");
  //   res.status(200).json({ message: "Commande déjà créée" });
  //   return;
  // }

  // if (orderData.length === 0) {
  //   console.log("Aucune commande à créer");
  //   res.status(200).json({ message: "Aucune commande à créer" });
  //   return;
  // }

  const order = {
    email: "tonibusatta@gmail.com",
    line_items: cartData.map((item) => ({
      variant_id: item.node.merchandise.id.match(/\d+/g).join(""),
      quantity: item.node.quantity,
      price: item.node.merchandise.price.amount,
    })),
    customer: {
      first_name: shipping_details.name.split(" ")[0],
      last_name: shipping_details.name.split(" ")[1],
      email: customer_details.email,
    },
    billing_address: {
      first_name: shipping_details.name.split(" ")[0],
      last_name: shipping_details.name.split(" ")[1],
      address1: shipping_details.address.line1,
      address2: shipping_details.address.line2,
      city: shipping_details.address.city,
      province: shipping_details.address.state,
      country: shipping_details.address.country,
      zip: shipping_details.address.postal_code,
    },
    shipping_address: {
      first_name: shipping_details.name.split(" ")[0],
      last_name: shipping_details.name.split(" ")[1],
      address1: shipping_details.address.line1,
      address2: shipping_details.address.line2,
      city: shipping_details.address.city,
      province: shipping_details.address.state,
      country: shipping_details.address.country,
      zip: shipping_details.address.postal_code,
    },
    inventory_behaviour: "decrement_ignoring_policy",
    subtotal_price: amount_subtotal / 100,
    financial_status: payment_status,
    send_fulfillment_receipt: true,
  };

  try {
    await createShopifyOrder(order);
    res.status(200).json({
      message: "La commande a été créée avec succès",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la création de la commande",
    });
  }
}

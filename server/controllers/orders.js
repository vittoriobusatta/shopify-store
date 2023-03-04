const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const DOMAIN_NAME = process.env.SHOPIFY_DOMAIN;
const API_KEY = process.env.SHOPIFY_ADMIN_API_KEY;
const API_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION;
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


async function createOrderFromStripe(req, res) {
  const session = req.body;
  console.log(session);


  // Créer la commande Shopify
  // const order = {
  //   line_items: session.display_items.map((item) => {
  //     return {
  //       title: item.custom.name,
  //       price: item.amount / 100,
  //       quantity: item.quantity,
  //       sku: item.custom.sku,
  //     };
  //   }),
  //   customer: {
  //     first_name: session.shipping.name.split(" ")[0],
  //     last_name: session.shipping.name.split(" ")[1],
  //     email: session.customer_email,
  //   },
  //   shipping_address: {
  //     address1: session.shipping.address.line1,
  //     address2: session.shipping.address.line2,
  //     city: session.shipping.address.city,
  //     province: session.shipping.address.state,
  //     country: session.shipping.address.country,
  //     zip: session.shipping.address.postal_code,
  //   },
  //   billing_address: {
  //     address1: session.shipping.address.line1,
  //     address2: session.shipping.address.line2,
  //     city: session.shipping.address.city,
  //     province: session.shipping.address.state,
  //     country: session.shipping.address.country,
  //     zip: session.shipping.address.postal_code,
  //   },
  //   financial_status: "paid",
  //   email: session.customer_email,
  //   total_price: session.amount_total / 100,
  //   subtotal_price: session.amount_subtotal / 100,
  //   total_weight: session.total_details.amount_shipping / 100,
  //   total_tax: session.total_details.amount_tax / 100,
  //   currency: session.currency,
  //   taxes_included: true,
  //   order_number: session.id,
  //   browser_ip: session.client_ip,
  //   device_id: session.client_reference_id,
  //   discount_codes: session.discount_codes,
  // };

  // try {
  //   const shopifyOrder = await createShopifyOrder(order);
  //   res.status(200).json(shopifyOrder);
  // } catch (error) {
  //   res.status(400).json({ message: error });
  // }
}



module.exports = createOrderFromStripe;

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

// async function createDraftOrder(req, res) {
//   const { data } = req.body;
//   console.log("data", data);
//   res.status(200).json({ data });
  // const { orderData, cartData } = data;
  // const {
  //   customer_details,
  //   shipping_details,
  //   amount_subtotal,
  //   payment_status,
  // } = orderData;

//   // const order = {
//   //   line_items: cartData.map((item) => {
//   //     return {
//   //       quantity: item.node.quantity,
//   //       price: item.node.merchandise.price.amount / 100,
//   //     };
//   //   }),
//   //   customer: {
//   //     first_name: shipping_details.name.split(" ")[0],
//   //     last_name: shipping_details.name.split(" ")[1],
//   //     email: customer_details.email,
//   //   },
//   //   shipping_address: {
//   //     address1: shipping_details.address.line1,
//   //     address2: shipping_details.address.line2,
//   //     city: shipping_details.address.city,
//   //     province: shipping_details.address.state,
//   //     country: shipping_details.address.country,
//   //     zip: shipping_details.address.postal_code,
//   //   },
//   //   billing_address: {
//   //     address1: shipping_details.address.line1,
//   //     address2: shipping_details.address.line2,
//   //     city: shipping_details.address.city,
//   //     province: shipping_details.address.state,
//   //     country: shipping_details.address.country,
//   //     zip: shipping_details.address.postal_code,
//   //   },
//   //   financial_status: payment_status,
//   //   subtotal_price: amount_subtotal / 100,
//   // };
// }

async function handler(req, res) {
  const { data } = req.body;
  console.log("data", data);
  res.status(200).json({ data });
}

module.exports = handler;

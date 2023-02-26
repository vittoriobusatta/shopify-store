const shopifyApi = require("../api/shopify");
const stripeApi = require("../api/stripe");

async function createOrderFromStripe(req, res) {
  // // Créer la commande dans Shopify
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

  // Envoyez la commande à Shopify
  // const createdOrder = await shopifyApi.post("/admin/orders.json", { order });

  // return createdOrder;
}

module.exports = createOrderFromStripe;
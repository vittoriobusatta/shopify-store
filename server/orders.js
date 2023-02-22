import express from "express";
import cors from "cors";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const DOMAIN_NAME = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const API_KEY = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_KEY;
const API_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_API_VERSION;
const endpoint = "orders";

let options = {
  method: "POST",
  url: `https://${API_KEY}:${API_TOKEN}@${DOMAIN_NAME}/admin/api/${API_VERSION}/${endpoint}.json`,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    order: {
      line_items: [
        {
          id: 13861469454610,
          admin_graphql_api_id: "gid://shopify/LineItem/13861469454610",
          fulfillable_quantity: 1,
          fulfillment_service: "manual",
          fulfillment_status: null,
          gift_card: false,
          grams: 0,
          name: "Chiffon Brown",
          price: "20.00",
          price_set: {
            shop_money: { amount: "20.00", currency_code: "EUR" },
            presentment_money: { amount: "20.00", currency_code: "EUR" },
          },
          product_exists: true,
          product_id: 8139519262994,
          properties: [],
          quantity: 8,
          requires_shipping: true,
          sku: "",
          taxable: true,
          title: "Chiffon Brown",
          total_discount: "0.00",
          total_discount_set: {
            shop_money: { amount: "0.00", currency_code: "EUR" },
            presentment_money: { amount: "0.00", currency_code: "EUR" },
          },
          variant_id: 44510946623762,
          variant_inventory_management: "shopify",
          variant_title: null,
          vendor: "Ma boutique",
          duties: [],
          discount_allocations: [],
        },
      ],
    },
  }),
};

app.get("/orders", (req, res) => {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
});

app.listen(667, () => {
  console.log("Le serveur est en écoute sur le port 667.");
});

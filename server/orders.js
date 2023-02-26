import express from "express";
import cors from "cors";
import request from "request";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const DOMAIN_NAME = process.env.SHOPIFY_DOMAIN;
const API_KEY = process.env.SHOPIFY_ADMIN_API_KEY;
const API_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const API_VERSION = process.env.SHOPIFY_ADMIN_API_VERSION;
const endpoint = "orders";

let options = {
  method: "POST",
  url: `https://${API_KEY}:${API_TOKEN}@${DOMAIN_NAME}/admin/api/${API_VERSION}/${endpoint}.json`,
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    order: {
      email: "tonibusatta@gmail.com",
      line_items: [
        {
          variant_id: "gid://shopify/ProductVariant/44510946787602",
          quantity: 3,
          price: "20.00",
          name: "Jersey",
          title : "chiffon-pale-rose",
        },
      ],
      billing_address: {
        first_name: "Busatta",
        last_name: "Toni",
        address1: "12 rue de l'église",
        phone: "06 93 47 48 29",
        city: "Saint-Benoît",
        province: "ON",
        country: "RE",
        zip: "97470",
      },
      shipping_address: {
        first_name: "Busatta",
        last_name: "Toni",
        address1: "12 rue de l'église",
        phone: "06 93 47 48 29",
        city: "Saint-Benoît",
        province: "ON",
        country: "RE",
        zip: "97470",
      },
    },
  }),
};

app.get("/orders.json", (req, res) => {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    const jsonData = JSON.parse(response.body);
    res.json(jsonData);
  });
});

app.listen(667, () => {
  console.log("Le serveur est en écoute sur le port 667.");
});

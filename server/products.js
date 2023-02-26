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
const endpoint = "products"

let options = {
  method: "GET",
  url: `https://${API_KEY}:${API_TOKEN}@${DOMAIN_NAME}/admin/api/${API_VERSION}/${endpoint}.json`,
  headers: {
    "Content-Type": "application/json",
  },
};

app.get("/products", (req, res) => {
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.send(response.body);
  });
});


app.listen(668, () => {
  console.log("Le serveur est en écoute sur le port 668.");
});

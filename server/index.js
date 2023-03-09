const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const webhook = require("./services/wehook");
const createDraftOrder = require("./controllers/orders");

dotenv.config();

const app = express();
app.use(cors());
app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.use(bodyParser.raw({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

app.post("/webhook", webhook);

app.post("/orders", createDraftOrder);

app.listen(4242, () => console.log("Running on port http://localhost:4242"));

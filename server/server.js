const express = require("express");
require('dotenv').config();
const cors = require("cors");
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

app.get("/khalti", async (req, res) => {
  try {
    const data = JSON.stringify({
      return_url: "http://localhost:5173/",
      website_url: "http://localhost:5173/",
      amount: 1000,
      "purchase_order_id": "test12",
      "purchase_order_name": "test",
      customer_info: {
        name: "Prabek Bir Bajracharya",
        email: "bazprabek@gmail.com",
        phone: "9861289596",
      },
      amount_breakdown: [
        {
          label: "Mark Price",
          amount: 1000,
        },
        // {
        //   label: "VAT",
        //   amount: 300,
        // },
      ],
    });
    var request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${process.env.LIVE_KEY}`,
      },
      body: data,
    };
    const response = await fetch(
      "https://khalti.com/api/v2/epayment/initiate/",
      request
    );
    const result = await response.text();
    const resultObject = JSON.parse(result);
    console.log(result);
    if (result) {
      res.send({ url: resultObject.payment_url });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(5000, () => console.log("Server Running...."));

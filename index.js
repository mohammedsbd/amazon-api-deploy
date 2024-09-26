
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// const { Message, CurrencyBitcoin } = require("@mui/icons-material");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

// stripe is made for backend for confimration of payment and stripe.js is made for react 

const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Success !",
  });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;

  if (total > 0) {
    console.log("Payment received", total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "Total must be greater than 0",
    });
  }
});


app.listen(5002,(err)=>{
    if(err) throw err
    console.log("Amazon Server Running On PORT: 5000, http://localhost:5002")

})


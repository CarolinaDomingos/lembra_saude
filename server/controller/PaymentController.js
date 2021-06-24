const UserModel = require("../models/UserModel");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

exports.payment = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Premium Access",
            images: [
              "https://www.hookahforum.com/uploads/monthly_2015_10/PremiumMember.jpg.4d12f509cf1eb6bf439d1dc9134ccd03.jpg",
            ],
          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  res.json({ id: session.id });
};

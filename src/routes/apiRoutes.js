import "dotenv/config";
import requireLogin from "../middlewares/requireLogin";
import express from "express";
import Stripe from "stripe";
const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.get("/api/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/api/currentuser", (req, res) => {
  // console.log(req);
  // res.send(req.session);
  res.send(req.user);
});

router.post("/api/stripe", requireLogin, async (req, res) => {
  //   console.log(req.body);

  // `source` is obtained with Stripe.js; see https://stripe.com/docs/payments/accept-a-payment-charges#web-create-token
  //   stripe.charges.create(
  //     {
  //       amount: 500,
  //       currency: "usd",
  //       source: req.body.id,
  //       description: "$5 for 5 Credits",
  //     },
  //     function (err, charge) {
  //       // asynchronously called to update users' credits
  //       console.log(charge);
  //       req.user.credits += 5;
  //       req.user.save().then((user) => res.send(user));
  //     }
  //   );
  const charge = await stripe.charges.create({
    amount: 500,
    currency: "usd",
    source: req.body.id,
    description: "$5 for 5 Credits",
  });

  req.user.credits += 5;
  const user = await req.user.save();
  res.send(user);
});

export default router;

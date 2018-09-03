const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();
//Stripe Payment processing
const stripe = require("stripe")("sk_test_8FszdpnPQNwdCZGQ4BuVNjDY");
// For dotenv (.ENV file with keys)
// const env = require("dotenv").config();

//Body Parser MiddleWare:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Stripe:
app.use(require("body-parser").text());

//DB Config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB through Mongoose:
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("Hello World!"));

//Passport Middleware:
app.use(passport.initialize());

//Passpost Config (Strategy (JWT vs local vs Oauth))
require("./config/passport")(passport);

// User Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

//Stripe:
app.post("/charge", async (req, res) => {
  try {
    let { status } = await stripe.charges.create({
      amount: 2000,
      currency: "usd",
      description: "An example charge",
      source: req.body
    });

    res.json({ status });
  } catch (err) {
    res.status(500).end();
  }
});

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load User Model:
const User = require("../../models/User");

//@route GET request to api/users/test
//@desc: Tests users route
//@access: public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//@route GET request to api/users/register
//@desc: Register a User
//@access: public
//check if email exists:
router.post("/register", (req, res) => {
  if (req.body) {
    const { errors, isValid } = validateRegisterInput(req.body);
    //Check Validation:
    if (!isValid) {
      return res.status(400).json(errors);
    }
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", //rating
        d: "mm" // defauult
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route GET request to api/users/login
//@desc: Login user / Returning JWT
//@access: public

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  //Check Validations:
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email:
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    //Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user passed: generate token:
        // res.json({ msg: "Success" });
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload
        // User Matched
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 604800 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET request to api/users/current
//@desc: Return Current User (Token)
//@access: private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // res.json({ msg: "Success" });
    // res.json(req.user);
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;

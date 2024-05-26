const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// importing models
const userModel = require("./models/userModel");
// database connection
mongoose
  .connect("mongodb://localhost:27017/nutrify")
  .then(() => {
    console.log("Database connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

// endpoint for registering user

app.post("/register", (req, res) => {
  let user = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    if (!err) {
      bcrypt.hash(user.password, salt, async (err, hpass) => {
        if (!err) {
          user.password = hpass;
          try {
            let doc = await userModel.create(user);
            res.status(201).send({ message: "User Registered" });
          } catch (err) {
            console.log(err);
            res.status(500).send({ message: "Some Problem" });
          }
        }
      });
    }
  });
});

// end point for login

app.post("/login", async (req, res) => {
  let userCred = req.body;

  try {
    const user = await userModel.findOne({ email: userCred.email });
    if (user !== null) {
      bcrypt.compare(userCred.password, user.password, (err, success) => {
        if (success == true) {
          jwt.sign({ email: userCred.email }, "nutrifyapp", (err, token) => {
            if (!err) {
              res.send({ message: "Login Success", token: token });
            }
          });
        } else {
          res.status(403).send({ message: "Incorrect password" });
        }
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Some Problem" });
  }
});

app.listen(8000, () => {
  console.log("Server is up and running");
});

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

app.listen(8000, () => {
  console.log("Server is up and running");
});

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

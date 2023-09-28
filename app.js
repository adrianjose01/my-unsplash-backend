const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const imageRoutes = require("./routes/images");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.use(imageRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const { statusCode } = error;
  const { message } = error;
  const { data } = error;
  res.status(statusCode).json({ message, data });
});

mongoose
  .connect("mongodb+srv://adrian:87456766@test.lowwjqz.mongodb.net/unsplash?")
  .then((result) => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });

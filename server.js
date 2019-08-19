const express = require("express");
const mongoose = require("mongoose");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;

mongoose.connect(
  process.env.MongoURI,
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: true },
  err => {
    if (err) throw err;

    console.log("MongoDB Connected!");
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth/", require("./route/auth"));

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`Server is running on port: ${PORT}`);
});

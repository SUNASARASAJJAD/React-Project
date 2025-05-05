const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./connection/connection");
const userLogin = require("./routes/loginRoute/userLoginRoute");
const adminUser = require("./routes/loginRoute/adminLoginRoute");
const product = require("./routes/pagesRoute/productPageRoute");
const category = require("./routes/pagesRoute/categoryRoutePage");
const ShippingAddress = require("./routes/customerRoute/ShippingAddressRoute");
const cart_items = require("./routes/customerRoute/Cart_ItemsRoute");

const app = express();
const PORT = process.env.PORT || 4500;
const URL = process.env.URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors());
app.use(express.json()); // Single JSON parser

// Routes with specific paths
app.use("/", userLogin);
app.use("/", adminUser);
app.use("/", product);
app.use("/", category);
app.use("/", ShippingAddress);
app.use("/", cart_items);

// Database connection and server start
db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed!", err);
    return;
  }
  app.listen(PORT, () => {
    console.log(`Connected!! Server Running On ${URL}`);
  });
});
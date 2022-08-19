const express = require("express");
const Product = require("../models/product");
const data = require("../data");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});

module.exports = router;

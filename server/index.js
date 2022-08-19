const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

//routing
const seedRoutes = require("./routes/seed");
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");
const uploadRoutes = require("./routes/upload");

//app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.get("/api/keys/google", (req, res) => {
  res.send({ key: process.env.GOOGLE_API_KEY || "" });
});

//api
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/seed", seedRoutes);
app.use("/api/upload", uploadRoutes);

//Error Handler
//app.use(notFound);
//app.use(errorHandler);

//used in production to serve client files
//const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

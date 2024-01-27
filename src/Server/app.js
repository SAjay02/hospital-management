// import { selectedItemsArray_to_backend} from '../components/Billing';
// const { selectedItemsArray_to_backend } = require('../components/Billing');
// import { selectedItemsArray_to_backend} from '../components/Billing'
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const Product = require("./models/productModels");
const Bill = require("./models/billModel");

const connectdb = require("./configuration/db");
const app = express();
//  const productModel = require('./products')
const PORT = process.env.PORT || 8000;

const availableProducts = [];
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectdb();

app.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body);
    const newProduct = await new Product(req.body);
    // console.log(newProduct)
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.post("/bill", async (req, res) => {
  try {
    console.log("Received Data:");
    const newBill = await new Bill(req.body);
    console.log(req.body);
    const savedBill = await newBill.save();
    // console.log(savedBill)
    res.status(201).json(savedBill);
    // {console.log("Post method of bill...........")}
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

app.post("/api/updateQuantities", async (req, res) => {
  try {
    let updatedQuantities = req.body.updatedQuantities;
    const items = req.body.items;
    const sell_price = req.body.selling;

    // Ensure updatedQuantities is an array
    if (!Array.isArray(updatedQuantities)) {
      updatedQuantities = [updatedQuantities];
    }
    let totalPrice = 0;
    // Update quantities in the database
    for (const updatedItem of updatedQuantities) {
      const existingItem = await Product.findOne({ name: updatedItem.item });
      if (existingItem) {
        existingItem.quantity -= updatedItem.quantity;

        const itemPrice = existingItem.selling || 0;
        totalPrice += updatedItem.quantity * itemPrice;

        await existingItem.save();
      }
    }

    res.send("Quantities updated successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/api/billdata", async (req, res) => {
  const bill = await Bill.find();
  // availableProducts.push(products)
  res.send(bill).json();
});

app.get("/api/data", async (req, res) => {
  const products = await Product.find();
  availableProducts.push(products);
  res.send(products);
});

app.get("/api/items", async (req, res) => {
  try {
    const items = await Product.find()
      .select("name")
      .select("quantity")
      .select("selling"); // Fetching names of items
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch data" });
  }
});
app.get("/bill", (req, res) => {
  const bill = Bill.find();
  res.send(bill);
});
app.listen(PORT, () => {
  console.log(`Port Connected ${PORT}`);
});
// console.log("first")
// console.log(availableProducts)
module.exports = app;
module.exports = availableProducts;

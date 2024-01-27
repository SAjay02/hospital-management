const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  quantity: {
    type: String,
    required: false,
  },
  measurement: {
    type: String,
    required: false,
  },
  condition: {
    type: String,
    required: false,
  },
  entryDate: {
    type: String,
    required: false,
  },
  manufactureDate: {
    type: String,
    required: false,
  },
  expiryDate: {
    type: String,
    required: false,
  },
  cost: {
    type: String,
    required: false,
  },
  selling: {
    type: String,
    required: false,
  },
  companyName: {
    type: String,
    required: false,
  },
  batch: {
    type: String,
    required: false,
  },
  vendorName: {
    type: String,
    required: false,
  },
  vendorNo: {
    type: String,
    required: false,
  },
});

const productModels = mongoose.model("products", productSchema);
module.exports = mongoose.model("products", productSchema);
exports.productModels = productModels;

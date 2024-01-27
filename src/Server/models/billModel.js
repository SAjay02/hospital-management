const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  mob_number: {
    type: String,
    required: false,
  },
  selectedItems: [
    {
      item: String,
      quantity: Number,
      sellingPrice: Number,
      // required : true
    },
  ],
  totalSelectedPrice: {
    type: Number,
    required: false,
  },
  // total_price : {
  //     type : Number,
  //     required : false
  // }
});

const billModel = mongoose.model("bills", billSchema);
module.exports = mongoose.model("bills", billSchema);
exports.billModel = billModel;

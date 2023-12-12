const mongoose = require('mongoose')


const billSchema = new mongoose.Schema({
    item : String,
    quantity : Number
})

billSchema.set('toJSON', {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      // Handle any other transformations you need
    },
  });

  
const billModel = new mongoose.model("bills",billSchema)
module.exports = mongoose.model("bills",billSchema)
exports.billModel = billModel
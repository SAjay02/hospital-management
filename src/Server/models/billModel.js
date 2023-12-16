const mongoose = require('mongoose')


const billSchema =  mongoose.Schema({
    name : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false
    },
    mob_number : {
        type : String,
        required : false
    },
    selectedItems :[{
        item : String,
        quantity : Number,
        // required : true
    }]
})

const billModel = mongoose.model('bills',billSchema)
module.exports = mongoose.model('bills',billSchema)
exports.billModel = billModel
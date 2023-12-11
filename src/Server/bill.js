const express = require('express')
const mongoose = require('mongoose')
const billModel = require('./models/billModel')
const app = express()
const router = express.Router()
app.use(express.json())

app.get("/" , async (req,res)=>{
    const model = await billModel.find()
    res.send(model) 
})
app.listen(8000, console.log("connected"))
module.exports = router
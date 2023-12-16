const express = require('express')
const mongoose = require('mongoose')
const productModel = require('./models/productModels')
const app = express()
// const router = express.Router()
app.use(express.json())

app.get("/" , async (req,res)=>{
    const model = await productModel.find()
    res.send(model) 
})

const port = process.env.PORT || 8000

app.listen(port, console.log(`server is running at port ${port}`)) 
// module.exports = router
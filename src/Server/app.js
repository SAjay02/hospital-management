const express=require("express");
const cors = require("cors")
const bodyParser=require("body-parser");
const Product =require("./models/productModels");
const connectdb = require("./configuration/db");
const app=express();
//  const productModel = require('./products')
const PORT=process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectdb();

app.post("/",async(req,res)=>
{
    try{
        console.log('Received Data:',req.body);
        const newProduct = await new Product(req.body);
        const savedProduct=await newProduct.save();
    res.status(201).json(savedProduct);
    }catch(error)
    {
        console.log("Error",error);
        res.status(500).json({
            error:"Internal Server Error"
        })
    }
})

app.get('/api/data', async (req,res)=>{
    const products = await Product.find()
    res.send(products)
})


app.listen(PORT,()=>
{
    console.log(`Port Connected ${PORT}`);
})
module.exports=app; 
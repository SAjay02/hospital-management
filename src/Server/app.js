const express=require("express");
const cors = require("cors")
const bodyParser=require("body-parser");
const Product =require("./models/productModels");
const Bill = require("./models/billModel")
const connectdb = require("./configuration/db");
const app=express();
//  const productModel = require('./products')
const PORT=process.env.PORT || 8000;

const availableProducts = []
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

app.post("/bill",async(req,res)=>
{
    try{
        console.log('Received Data:',req.body);
        const newBill = await new Bill(req.body);
        const savedBill=await newBill.save();
        res.status(201).json(savedBill);
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
    availableProducts.push(products)
    res.send(products)
})

app.get('/api/items', async (req, res) => {
    try {
      const items = await Product.find().select('name').select('quantity'); // Fetching names of items
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch data' });
    }
  });
  app.post('/api/storeSelectedData', async (req, res) => {
    try {
      const { selectedData } = req.body;
      const savedData = await SelectedData.create(selectedData);
      res.status(201).json(savedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  app.get("/bill",(req,res)=>{
    const bill = Bill.find();
    res.send(bill);

  })
app.listen(PORT,()=>
{
    console.log(`Port Connected ${PORT}`);
})
// console.log("first")
// console.log(availableProducts)

module.exports=app; 
module.exports = availableProducts
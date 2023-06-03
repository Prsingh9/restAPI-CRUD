const express=require('express')
const mongoose=require('mongoose')
const Product = require('./models/productModel')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.get('/',(req,res)=>{
    res.send("hello node api");
})

app.get('/blog',(req,res)=>{
    res.send("hello blog , my name is prabhakar");
})

//get the data
app.get('/products',async(req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//post the data
app.post('/products',async (req,res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})

//update the product data
app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete the product data

app.delete('/products/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        const product= await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with id ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://admin:admin1234@prabcluster.etlmqsq.mongodb.net/cruds-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to mongodb")
    app.listen(4000,()=>{
        console.log("app is runnung on port 4000")
    })
    
}).catch((error)=>{
    console.log(error)
})
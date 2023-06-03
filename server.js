const express=require('express')
const app=express()

//routes
app.get('/',(req,res)=>{
    res.send("hello node api");
})

app.get('/blog',(req,res)=>{
    res.send("hello blog , my name is prabhakar");
})


app.listen(4000,()=>{
    console.log("app is runnung on port 4000")
})
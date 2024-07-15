const express= require('express');
const app=express();
const mongoose=require('mongoose');
const {connectDb,checkConnected }=require('./db');
const router = require('./route');
const port= 3000;

app.get('/ping',(req,res)=>{
    res.send("pong")  
})


app.use(express.json());
app.use(router)

app.listen(port,async()=>{
    try{
       await connectDb()
       if(checkConnected()){
        
        console.log("port is running successful")
       }
       
    }
    catch(error){
        console.log(error)
    }
    
})



const express= require('express');
const app=express();
const mongoose=require('mongoose');
const {connectDb,checkConnected }=require('./config/db');
const router = require('./Routes/route');
const port= 3002;
const cors = require("cors")

app.get('/ping',(req,res)=>{
    res.send("pong")  
})

app.get("/home",(req,res)=>{
    res.json({
        message:checkConnected()?"Database is connected" : "Database is disconnected"
    })

})
   
app.use(cors())
app.use(express.json());
app.use("/", router)

app.listen(port || 3001,async()=>{
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



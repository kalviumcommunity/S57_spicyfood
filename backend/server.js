const express= require('express');
const app=express();
const mongoose=require('mongoose');
const {connectDb,checkConnected }=require('./db');
const port= 3000;
app.get('/',(req,res)=>{
    res.send("pong")

})
app.use(express.json());

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



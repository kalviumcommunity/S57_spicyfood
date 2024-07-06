const express= require('express');
const app=express();
const mongoose=require('mongoose');
const {connectDb,checkConnected }=require('./db');
const port= 3000;
// app.get('/ping',(req,res)=>{
//     res.send("pong")

// })
app.use(express.json());

connectDb()
app.listen(port,()=>{
    console.log("port is running successful")
})



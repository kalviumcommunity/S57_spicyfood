const express= require('express');
const app=express();
const mongoose=require('mongoose');
const {connectDb,checkConnected }=require('./config/db');
const router = require('./Routes/route');
const port= 3002;
const cors = require("cors");
const userRouter = require('./Routes/userRoute');


app.get("/home",(req,res)=>{
    res.json({
        message:checkConnected()?"Database is connected" : "Database is disconnected"
    })

})
   
app.use(cors())
app.use(express.json());

app.use("/", router)
app.use("/users", userRouter)

app.listen(port || 3001,async()=>{
    try{
       await connectDb()
       if(checkConnected()){
        
        console.log(`port is running on ${port} successfully`)
       }
       
    }
    catch(error){
        console.log(error)
    }
    
})



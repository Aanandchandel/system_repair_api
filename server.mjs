import express from "express"
import connectDb from "./src/config/mongoDbConfig.mjs";
const app=express();



//routes
app.get("/",(req,res)=>{
    res.send("hello")
})

//connect to DB
connectDb()
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`port is running on ${PORT}`  )
})
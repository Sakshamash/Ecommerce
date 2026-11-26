require("dotenv").config();
const express=require("express");
const connectDB = require("./src/config/db");
const authroute=require("./src/routes/auth.routes");
const cookieParser = require("cookie-parser");
const app=express();


app.use(express.json());
app.use(cookieParser());
connectDB();
app.use("/api/auth",authroute);


app.use(notFound);
app.use(errorHandler);



app.listen(process.env.PORT,()=>{
    console.log("Connected to Server on port 5000")
})
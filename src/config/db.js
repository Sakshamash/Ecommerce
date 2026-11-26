const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Connection Successfully")
}
catch(error){
    console.log("Error in Connection in database",error)
}
}


module.exports=connectDB
const mongoose = require("mongoose");
require('dotenv').config();

async function connectdb(){
    try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to db");
    }
    catch(error){
    console.error("DB connection error:", error);
    process.exit(1);
}
}

module.exports = connectdb;
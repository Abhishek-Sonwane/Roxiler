const mongoose = require("mongoose");
const initData = require("./data.js");
const Transaction = require("../models/transaction.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/roxiler";

main().then(()=>{
    console.log("Sucessfully Connected to MOngoDB");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Transaction.deleteMany({});
    await Transaction.insertMany(initData.data);
    console.log("Data was Initialized");
};

initDB();
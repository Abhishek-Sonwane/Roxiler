import mongoose from "mongoose";
const Schema = mongoose.Schema;

const initTransaction = new Schema({
    id:{
        type : String,
    },
    title :{
        type : String,
    },
    price : {
        type : Number,
    },
    description : {
        type : String,
    },
    category : {
        type : String,
    },
    image : {
        type : String,
    },
    sold : {
        type : Boolean,
    },
    dateOfSale : {
        type : String
    },
});

const Transaction = mongoose.model("Transaction",initTransaction);
export default Transaction;
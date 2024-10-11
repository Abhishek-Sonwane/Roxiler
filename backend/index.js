import express from "express";
const app = express();
import cors from "cors";
import Transaction from "./models/transaction.js";

const port = process.env.port || 3000;
app.use(cors());
app.use(express.json());

import mongoose from "mongoose";

const MONGO_URL = "mongodb://127.0.0.1:27017/roxiler";

main()
  .then(() => {
    console.log("Connected To MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.get("/getTransaction", async (req, res) => {
  //   let allTransaction = await Transaction.find({});
  await Transaction.find({})
    .then((trans) => res.json(trans))
    .catch((err) => {
      res.json(err);
    });
  //   console.log(allTransaction);
});

app.listen(port, () => {
  console.log(`Sucessfully Connected to Port ${port}`);
});

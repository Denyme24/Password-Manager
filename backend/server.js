import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3000;
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = "CipherNest";
await client.connect();

// Get all the passwords
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("Credentials");
  const findResults = await collection.find({}).toArray();
  res.json(findResults);
});

// Insert all the passwords
app.post("/", async (req, res) => {
  const passwords = req.body;
  const db = client.db(dbName);
  const collection = db.collection("Credentials");
  const insertPass = await collection.insertOne(passwords);

  res.send({ Inserted: true });
});

//Deleting a Password
app.delete("/", async (req, res) => {
  const passwords = req.body;
  const db = client.db(dbName);
  const collection = db.collection("Credentials");
  const deletePass = await collection.deleteOne(passwords);

  res.send({ deleted: true });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

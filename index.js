import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { MongoClient } from "mongodb";
// const express = require("express");
import movieRouter from "./router/movie.router.js";

// console.log(process.env.MONGO_URL);



const app = express();

const PORT = process.env.PORT;  //-> Auto assignable PORT

const MONGO_URL = "mongodb://127.0.0.1";  //-->Local mongo connect
// const MONGO_URL = process.env.MONGO_URL  //-->Mongo server connect
export const client = new MongoClient(MONGO_URL); // dial
// Top level await
await client.connect(); // call
console.log("Mongo is connected !!!  ");


app.get("/", function (request, response) {
  response.send("Hello world....");
});

app.use("/movies", movieRouter)

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));


import express from "express";
import { client } from "../index.js";

const router = express.Router();


router.get("/", async function (request, response) {
    const movies = await client.db("movies").collection("directors").find({}).toArray();
    // console.log(movies);
    response.send(movies);
  
  });


  router.post("/", express.json(), async function (request, response) { 
      const data = request.body;
      console.log(data);
      
      if (!Array.isArray(data)) {
        return response.status(400).send("Data must be an array of documents.");
      }
    
      const result = await client.db("movies").collection("directors").insertMany(data);
      response.send(result);
    
    });


    export default router;
import express, { response } from "express";
import { client } from "../index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

async function generateHashedPassword(password) {
  const NO_OF_ROUNDS = 10;
  const salt = await bcrypt.genSalt(NO_OF_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  // console.log(salt);
  // console.log(hashedPassword);
  return hashedPassword
}

// generateHashedPassword("password123")

async function getUserByName(username) {
  return await client.db("movies").collection("users").findOne({ username: username })
}


router.post("/signup", express.json(), async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await getUserByName(username);
  // console.log(userFromDB);

  if (userFromDB) {
    response.status(401).send({ message: "User name already exists" })
  } else if (password.lenght < 8) {
    response.status(401).send({ message: "Password must be at least 8 characters" })
  }
  else {
    const hashedPassword = await generateHashedPassword(password);
    const result = await client.db("movies").collection("users").insertOne({
      username: username,
      password: hashedPassword
    });
    response.send(result);
  }
});

router.post("/login", express.json(), async function (request, response) {
  const { username, password } = request.body;
  const userFromDB = await getUserByName(username);
  // console.log(userFromDB.username);
  if (!userFromDB) {
    response.send({ message: "Invalid Crendentials" })
  } else {
    const storedDBpasssword = userFromDB.password;
    const isPasswordCheck = await bcrypt.compare(password, storedDBpasssword)
    // console.log(isPasswordCheck);
    if (isPasswordCheck) {
      const token = jwt.sign({id : userFromDB._id},process.env.SECRET_KEY)
      response.send({ message: "Login Successfull" , token : token})
    } else {
      response.send({ message: "Invalid Crendential" })
    }

  }
});



export default router;
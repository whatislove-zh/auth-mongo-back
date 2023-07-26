import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registerValidation, loginValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://admin:UYn6G5CTLAAlqDeD@cluster0.dzt2he4.mongodb.net/auth?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB error:", err));

const app = express();
app.use(express.json());
app.use(cors());

//Routes//////////////////////////////////////////////////////////////////

//Auth/////////////////
//Login////////////////////////////////////////////////////////////////
app.post("/login", loginValidation, UserController.login);
//Register////////////////////////////////////////////////////////////////
app.post("/register", registerValidation, UserController.register);
//auth me
app.get("/auth", checkAuth, UserController.authMe);

//listen port/////////////////////////////////////////////
const PORT = process.env.PORT || 3030;

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("server OK");
});

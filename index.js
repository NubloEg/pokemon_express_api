import express from "express";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import chakAuth from "./utils/chakAuth.js";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(
    "mongodb+srv://boroda4kak:eeggoorr1@pokemon.oi7mvsk.mongodb.net/pokemonApi?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());

app.get("/", UserController.getAllUsers);
app.get("/auth/me", chakAuth, UserController.profile);
app.post("/auth/login", UserController.login);
app.post("/auth/register", registerValidation, UserController.register);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});

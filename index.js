import express from "express";
import mongoose from "mongoose";
import { registerValidation, authValidation } from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import cors from "cors";

import * as UserController from "./controllers/UserController.js";

mongoose
  .connect(process.env.DB_URL || "mongodb+srv://boroda4kak:eeggoorr1@pokemon.oi7mvsk.mongodb.net/pokemonApi?retryWrites=true&w=majority")
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", UserController.getAllUsers);
app.get("/auth/me", checkAuth, UserController.profile);
app.post("/auth/login", authValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);

app.patch("/pokemon", checkAuth, UserController.addPokemon);
app.patch("/money", checkAuth, UserController.setMoney);
app.patch("/boss", checkAuth, UserController.setBossHp);
app.patch("/checkAction", checkAuth, UserController.setToDayAction);

app.listen(process.env.PORT || 4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});

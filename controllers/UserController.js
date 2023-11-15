import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";


export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const createUser = new UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash: hash,
    });

    const user = await createUser.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "grgkbg",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.passwordHash
    );

    if (!isValidPassword) {
      return res.status(404).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "grgkbg",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const profile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Нет доступа",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
    });
  } catch (error) {
    res.status(403).json({
      message: "Нет доступа",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try{
    const users = await UserModel.find().exec();
    res.json(users);
  }catch(e){
    res.status(500).json({
        message: "Не могу получить пользователей",
      });
  }
};

export const addPokemon = async (req, res) => {
  try{
    const user = await UserModel.findByIdAndUpdate({
      _id:req.userId
    },{
      $push:{ pokemons: req.body.pokemonId }
    },{
      returnDocument:'after'
    });

    res.json(user.pokemons)


  }catch(e){
    console.log(e)
    res.status(500).json({
        message: "Не удалось добавить покемона",
      });
  }
};

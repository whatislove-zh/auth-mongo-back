import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "Cant find this user",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "incorrect email or Password",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Can't login ",
    });
  }
};

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.json({ ...userData, token });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Can't register this user ",
    });
  }
};

export const authMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "No such user",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.json(userData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Cant access profile ",
    });
  }
};

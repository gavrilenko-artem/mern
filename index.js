import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { validationResult } from "express-validator";

import { registerValidation } from "./validations/auth.js";

import UserModel from "./models/Usrer.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.yxuxfje.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB Error ,", err));

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Holla!");
});

app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const document = UserModel({
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: req.body.avatarUrl,
      passwordHash,
    });

    const user = await document.save();

    res.json(user);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to register",
    });
  }
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});

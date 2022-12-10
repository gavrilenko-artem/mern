import express from "express";
import mongoose from "mongoose";
import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";
import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

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

app.post("/auth/login", loginValidation, UserController.login);

app.post("/auth/register", registerValidation, UserController.register);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/posts", checkAuth, postCreateValidation, PostController.create);

app.get("/posts", PostController.getAll);

app.get("/posts/:id", PostController.getOne);

app.patch("/posts/:id", checkAuth, PostController.update);

app.delete("/posts/:id", checkAuth, PostController.remove);

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});

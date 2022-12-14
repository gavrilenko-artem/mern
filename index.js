import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import {
  registerValidation,
  loginValidation,
  postCreateValidation,
} from "./validations/validations.js";

import { checkAuth, validationHandleErrors } from "./utils/index.js";
import { PostController, UserController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.yxuxfje.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB Error ,", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("Holla!");
});

app.post(
  "/auth/login",
  loginValidation,
  validationHandleErrors,
  UserController.login
);

app.post(
  "/auth/register",
  registerValidation,
  validationHandleErrors,
  UserController.register
);

app.get("/auth/me", checkAuth, UserController.getMe);

app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  validationHandleErrors,
  PostController.create
);

app.get("/posts", PostController.getAll);

app.get("/posts/:id", PostController.getOne);

app.patch(
  "/posts/:id",
  checkAuth,
  postCreateValidation,
  validationHandleErrors,
  PostController.update
);

app.delete("/posts/:id", checkAuth, PostController.remove);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.listen(4000, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK!");
});

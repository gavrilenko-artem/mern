import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email is invalid").isEmail(),
  body("password", "Password min lenght 5").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Email is invalid").isEmail(),
  body("password", "Password min lenght 5").isLength({ min: 5 }),
  body("fullName", "Full Name min lenght 3").isLength({ min: 3 }),
  body("avatarUrl", "URL avatar is incored").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Enter title").isLength({ min: 3 }).isString(),
  body("text", "Enter text").isLength({ min: 10 }).isString(),
  body("tags", "Enter tags").optional().isString(),
  body("imgUrl", "Enter valid img url").optional().isString(),
];

import { body } from "express-validator";

export const registerValidation = [
  body("email", "Email is invalid").isEmail(),
  body("password", "Password min lenght 5").isLength({ min: 5 }),
  body("fullName", "Full Name min lenght 3").isLength({ min: 3 }),
  body("avatarUrl", "URL avatar is incored").optional().isURL(),
];

import { body } from "express-validator";

export const loginValidation = [
  body("email", "wrong email format").isEmail(),
  body("password", "password should contain at least 5 characters").isLength({
    min: 5,
  }),
];

export const registerValidation = [
  body("email", "wrong email format").isEmail(),
  body("password", "password should contain at least 5 characters").isLength({
    min: 5,
  }),
  body("firstName", "First name should contain at least 3 characters").isLength(
    {
      min: 3,
    }
  ),
  body("lastName", "Last name should contain at least 3 characters").isLength({
    min: 3,
  }),
  body("phone", "Wrong phone format").isLength({
    min: 9,
  }),
];

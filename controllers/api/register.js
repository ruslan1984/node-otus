import express from "express";
import { body, validationResult } from "express-validator";
import usersModel from "../../models/user.js";
import md5 from "md5";

const router = express.Router();

router.post(
  "/",
  body("name", "Имя должно быть более 5и символов").isLength({ min: 5 }),
  body("password", "Пароль должен быть более 5и символов").isLength({ min: 5 }),
  body("passwordConfirmation").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Пароли не совпадают");
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    const isExist = await usersModel
      .find({ name: req.body.name.trim() })
      .exec();
    if (isExist.length > 0) {
      return res.json([{ msg: "Пользователь с таким именем существует" }]);
    }
    const newUser = new usersModel({
      name: req.body.name.trim(),
      password: md5(req.body.password),
    });
    const n = await newUser.save();
    res.cookie("user", n._id.toString());
    return res.json({ token: n._id.toString() });
  }
);

export default router;

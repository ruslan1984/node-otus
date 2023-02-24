import express from "express";
import usersModel from "../models/user.js";
import md5 from "md5";

const router = express.Router();

router.get("/", function (req, res) {
  res.render("pages/login", { errors: [] });
});
router.post("/", function (req, res) {
  const {
    body: { name, password },
  } = req;

  usersModel.findOne({ name }, function (err, user) {
    if (err) {
      return res.render("pages/login", {
        errors: ["Ошибка сервера"],
      });
    }
    if (!user) {
      return res.render("pages/login", {
        errors: ["Неверный логин или пароль"],
      });
    }
    if (md5(password) !== user.password) {
      return res.render("pages/login", {
        errors: ["Неверный логин или пароль"],
      });
    }
    res.cookie("user", user._id.toString()).redirect("/");
  });
});

export default router;

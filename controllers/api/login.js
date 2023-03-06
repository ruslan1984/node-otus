import express from "express";
import usersModel from "../../models/user.js";
import md5 from "md5";

const router = express.Router();

router.post("/", function (req, res) {
  const { name, password } = req.body;

  return usersModel.findOne({ name }, function (err, user) {
    if (err) {
      return res.json({ error: "Ошибка сервера" });
    }
    if (!user) {
      return res.json({ error: "Неверный логин или пароль" });
    }
    if (md5(password) !== user.password) {
      return res.json({ error: "Неверный логин или пароль1" });
    }
    res.cookie("user", user._id.toString());
    return res.json({ token: user._id.toString() });
  });
});

export default router;

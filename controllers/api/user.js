import express from "express";
import usersModel from "../../models/user.js";

const router = express.Router();

router.get("/", async function (req, res) {
  const users = await usersModel.find();
  res.json(users);
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const user = await usersModel.findById(id);
  res.json(user);
});

router.post("/add", async function (req, res) {
  const body = req.body;
  const newUser = new usersModel(body);
  await newUser.save();
  res.json(newUser);
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const d = await usersModel.deleteOne({ _id: id });
  res.json(d);
});

export default router;

import express from "express";
import moment from "moment";
import { Types } from "mongoose";
import { body, validationResult } from "express-validator";
import coursesModel from "../../models/course.js";
import usersModel from "../../models/user.js";
import commentModel from "../../models/comment.js";
const router = express.Router();

router.get("/", async function (req, res) {
  const courses = await coursesModel
    .find()
    .populate("author", { id: 1, name: 1 })
    .populate("editors", { id: 1, name: 1 });
  res.json(courses);
});

router.post(
  "/add",
  body("name", "Название курса должно быть более 5и символов").isLength({
    min: 5,
  }),
  body("description", "Описание курса должно быть более 5и символов").isLength({
    min: 5,
  }),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    const userId = req.cookies.user;
    const body = { ...req.body, author: userId };
    const course = new coursesModel(body);
    await course.save();
    res.json(course);
  }
);

router.get("/my", async function (req, res) {
  const userId = req.cookies.user;
  const courses = await coursesModel
    .find({ author: userId })
    .populate("author", { id: 1, name: 1 })
    .populate("editors", { id: 1, name: 1 });
  res.json(courses);
});

router.delete("/:id/delete", async function (req, res) {
  const _id = req.params.id;
  await coursesModel.deleteOne({ _id });
  res.json({ id: _id });
});

router.get("/:id", async function (req, res) {
  const id = req.params.id;
  const course = await coursesModel
    .findById(id)
    .populate("author", { id: 1, name: 1 })
    .populate("editors", { id: 1, name: 1 })
    .populate({
      path: "comments",
      populate: { path: "author", model: "users" },
    });
  res.json(course);
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const d = await coursesModel.deleteOne({ _id: id });
  res.json(d);
});

router.put(
  "/:id/edit",
  body("name", "Название курса должно быть более 5и символов").isLength({
    min: 5,
  }),
  body("description", "Описание курса должно быть более 5и символов").isLength({
    min: 5,
  }),
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json(errors);
    }
    const id = req.params.id;
    const body = req.body;
    const course = await coursesModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.json(course);
  }
);

router.put("/:id/add_comment", async (req, res) => {
  const courseId = req.params.id;
  const userId = req.cookies.user;
  const text = req.body.comment;
  const data = {
    text,
    author: userId,
  };
  const course = await coursesModel.findById(courseId);
  const comment = new commentModel(data);
  await comment.save();
  course.comments = [...course.comments, comment._id];
  await course.save();
  return res.json(comment);
});

export default router;

import express from "express";
import moment from "moment";
import { Types } from "mongoose";
import { body, validationResult } from "express-validator";
import coursesModel from "../models/course.js";
import usersModel from "../models/user.js";
import commentModel from "../models/comment.js";
const router = express.Router();

router.get("/", async function (req, res) {
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const courses = await coursesModel.find().populate("author");
  res.render("pages/course/list", { courses, user, moment });
});

router.get("/add", async function (req, res) {
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const users = await usersModel.find({ _id: { $ne: Types.ObjectId(userId) } });
  res.render("pages/course/card/add", { users, user });
});

router.get("/my", async function (req, res) {
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const courses = await coursesModel.find({ author: user });
  res.render("pages/course/list", { courses, user, moment });
});

router.get("/:id/delete", async function (req, res) {
  const _id = req.params.id;
  await coursesModel.deleteOne({ _id });
  res.redirect("/course");
});

router.get("/:id", async function (req, res) {
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const courseId = req.params.id;
  const course = await coursesModel
    .findById(courseId)
    .populate("editors")
    .populate({
      path: "comments",
      populate: { path: "author", model: "users" },
    });
  const isEditor =
    String(userId) === String(course.author) ||
    course.editors.some(({ _id }) => String(_id) === String(userId));
  res.render("pages/course/card/card", { course, user, moment, isEditor });
});

router.get("/:id/edit", async function (req, res) {
  const id = req.params.id;
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const users = await usersModel.find({ _id: { $ne: Types.ObjectId(userId) } });
  const course = await coursesModel.findById(id);
  res.render("pages/course/card/edit", { course, users, user });
});
router.post(
  "/:id/edit",
  body("name", "Название курса должно быть более 5и символов").isLength({
    min: 5,
  }),
  body("description", "Описание курса должно быть более 5и символов").isLength({
    min: 5,
  }),
  async function (req, res) {
    const userId = req.cookies.user;
    const user = await usersModel.findById(userId);
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const course = await coursesModel.findById(id);
      return res.render("pages/course/edit", {
        course: { _id: id, ...course, ...req.body },
        errors: errors.array(),
      });
    }

    const body = req.body;
    const course = await coursesModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    await course.save();
    res.redirect("/course/" + id);
  }
);

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
      return res.render("pages/course/card/add", {
        course: { ...req.body },
        errors: errors.array(),
      });
    }
    const userId = req.cookies.user;
    const body = { ...req.body, author: userId };
    const course = new coursesModel(body);
    await course.save();
    res.redirect("/");
  }
);

router.post("/:id/add_comment", async (req, res) => {
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
  res.redirect("/course/" + courseId);
});

router.get("/:id/delete", async function (req, res) {
  const _id = req.params.id;
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const courses = await coursesModel.deleteOne({ _id });
  res.render("pages/course/list", { courses, user });
});

export default router;

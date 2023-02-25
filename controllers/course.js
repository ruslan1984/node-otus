import express from "express";
import moment from "moment";
import { body, validationResult } from "express-validator";
import coursesModel from "../models/course.js";
import usersModel from "../models/user.js";
import commentModel from "../models/comment.js";
const router = express.Router();

router.get("/", async function (req, res) {
  const id = req.cookies.user;
  const user = await usersModel.findById(id);
  const courses = await coursesModel.find().populate("author");
  res.render("pages/course/list", { courses, user, moment });
});

router.get("/add", async function (req, res) {
  const id = req.cookies.user;
  const user = await usersModel.findById(id);
  const users = await usersModel.find({ $not: { _id: id } });
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
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const courses = await coursesModel.deleteOne({ _id });
  res.render("pages/course/list", { courses, user });
});
//Api
router.get("/list", async function (req, res) {
  const course = await coursesModel.find().populate("editors");
  res.json(course);
});

router.get("/:id", async function (req, res) {
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const id = req.params.id;
  const course = await coursesModel
    .findById(id)
    .populate("editors")
    .populate({
      path: "comments",
      populate: { path: "author", model: "users" },
    });

  res.render("pages/course/card/card", { course, user, moment });
});

router.get("/:id/edit", async function (req, res) {
  const id = req.params.id;
  const userId = req.cookies.user;
  const user = await usersModel.findById(userId);
  const users = await usersModel.find({ $not: { _id: id } });
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
    const users = await usersModel.find({ $not: { _id: id } });
    res.render("pages/course/card/edit", { course, users, user });
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

  const user = await usersModel.findById(userId);
  const course = await coursesModel
    .findById(courseId)
    .populate("editors")
    .populate({
      path: "comments",
      populate: { path: "author", model: "users" },
    });

  const comment = new commentModel(data);
  await comment.save();
  course.comments = [...course.comments, comment._id];
  await course.save();
  res.render("pages/course/card/card", { course, user, moment });
});

router.get("/get/:id", async function (req, res) {
  const id = req.params.id;
  const course = await coursesModel
    .findById(id)
    .populate("editors")
    .populate({
      path: "comments",
      populate: { path: "author", model: "users" },
    });
  res.json(course);
});

router.post("/add", async function (req, res) {
  const body = req.body;
  const course = new coursesModel(body);
  await course.save();
  res.json(course);
});

router.post("/:id/update", async function (req, res) {
  const id = req.params.id;
  const body = req.body;
  const course = await coursesModel.findByIdAndUpdate(id, body, { new: true });
  res.json(course);
});

router.delete("/:id", async function (req, res) {
  const id = req.params.id;
  const d = await coursesModel.deleteOne({ _id: id });
  res.json(d);
});

export default router;

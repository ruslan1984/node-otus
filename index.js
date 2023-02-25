import express from "express";
import mongoose from "mongoose";
import userController from "./controllers/user.js";
import courseController from "./controllers/course.js";
import loginController from "./controllers/login.js";
import registerController from "./controllers/register.js";
import bodyParser from "body-parser";
import coursesModel from "./models/course.js";
import cookieParser from "cookie-parser";
import usersModel from "./models/user.js";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/my-courses-otus")
  .then(() => console.log("Connected!"));

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cookieParser(""));

app.use(async (req, res, next) => {
  if (req.url === "/login" || req.url === "/register") {
    return next();
  }

  const id = req.cookies?.user;
  const user = await usersModel.findById(id);
  if (user) {
    next();
  } else {
    res.redirect("/login");
  }
});

app.get("/", async (req, res) => {
  const courses = await coursesModel.find();
  const id = req.cookies.user;
  const user = await usersModel.findById(id);
  res.render("pages/index", { courses, user });
});
app.get("/logout", async (req, res) => {
  res.clearCookie("user").redirect("/login");
});

app.use("/user", userController);
app.use("/course", courseController);
app.use("/login", loginController);
app.use("/register", registerController);
app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

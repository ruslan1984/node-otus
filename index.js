import express from "express";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index");
});

app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

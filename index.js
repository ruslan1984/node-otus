#!/usr/bin/env node
import { getValue, isExist, isAuth, setData, testLogout } from "./helpers.js";
import fs from "fs";
import data from "./data.json" assert { type: "json" };

(async () => {
  let user = "";
  let password = "";
  user = getValue("-u");
  password = getValue("-p");
  if (user === "user" && password === "123") {
    fs.open("file", "w", (err) => {
      if (err) throw err;
    });
    console.log("Welocome");
  } else if (!isAuth()) {
    console.log(401);
  }

  if (!isAuth()) return;
  if (isExist("ls")) {
    console.log(data);
  }
  await setData();
  testLogout();
})();

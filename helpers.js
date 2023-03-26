import fs from "fs";
import { writeFile } from "node:fs/promises";
import data from "./data.json" assert { type: "json" };

export const isAuth = () => {
  return fs.existsSync("./file");
};
export const getValue = (key) => {
  const index = process.argv.findIndex(
    (item) => item.slice(0, 3) === key + "="
  );
  if (index !== -1) {
    return process.argv[index].split("=")[1].trim();
  }
  return null;
};

export const isExist = (key) => {
  const index = process.argv.findIndex((item) => item === key);
  return index !== -1;
};

export const setData = async () => {
  const index = process.argv.findIndex((item) => item.slice(0, 4) === "set:");
  if (index === -1) return;
  const set = process.argv[index].split(":")[1];
  const [key, val] = set.split("=");
  data[key] = val;
  await writeFile("data.json", JSON.stringify(data));
};

export const testLogout = () => {
  const index = process.argv.findIndex((item) => item.slice(0, 6) === "logout");
  if (index === -1) return;
  fs.unlink("file", (err) => {
    if (err) throw err;
    console.log("logout");
  });
};

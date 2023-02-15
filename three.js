import fs from "node:fs";

export const three = (dir, depth = 2, curLevel = 0) => {
  const files = fs.readdirSync(dir);
  return files
    .map((file) => {
      const path = dir + "/" + file;
      let str = "| ".repeat(curLevel) + "└───" + file + "\n";
      if (fs.lstatSync(path).isDirectory() && depth > curLevel) {
        str += three(path, depth, curLevel + 1);
      }
      return str;
    })
    .join("");
};

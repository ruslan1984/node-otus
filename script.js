import fs from "node:fs";

const three = (dir, depth = 2, curLevel = 0) => {
  const files = fs.readdirSync(dir);
  files.map((file) => {
    console.log("| ".repeat(curLevel) + "└───" + file);
    const path = dir + "/" + file;
    if (fs.lstatSync(path).isDirectory() && depth > curLevel) {
      three(path, depth, curLevel + 1);
    }
  });
};

three(process.cwd(), 2);

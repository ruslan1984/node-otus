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

let dir = process.cwd();
let depth = 1;

process.argv.forEach((item) => {
  const arr = item.split("=");
  if (arr[0] === "dir") {
    dir = arr[1];
  }
  if (arr[0] === "depth") {
    depth = Number(arr[1]);
  }
});

three(dir, depth);

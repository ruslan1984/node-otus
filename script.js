import { three } from "./three.js";

let dir = process.cwd() + "/folders";
let depth = 2;

const str = three(dir, depth);
console.log(str);

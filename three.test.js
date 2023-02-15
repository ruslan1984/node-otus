import mock from "mock-fs";
import path from "path";
import { three } from "./three.js";

mock({
  folders: {
    "index.md": "",
    folder: {
      dir_1: {
        "file1_1.txt": "",
        "file1_2.txt": "",
      },
      dir_2: {
        "file2_1.txt": "",
        "file2_2.txt": "",
      },
    },
  },
  node_modules: mock.load(path.resolve(process.cwd() + "/node_modules")),
});

afterAll(() => {
  mock.restore();
});

describe("test fs", () => {
  let dir = process.cwd() + "/folders";
  it("test0", () => {
    const str = three(dir, 0);
    console.log(str);
    expect(str).toEqual("└───folder\n└───index.md\n");
  });
  it("test1", () => {
    const str = three(dir, 1);
    expect(str).toEqual("└───folder\n| └───dir_1\n| └───dir_2\n└───index.md\n");
  });
  it("test2", () => {
    const str = three(dir, 2);
    expect(str).toEqual(
      "└───folder\n| └───dir_1\n| | └───file1_1.txt\n| | └───file1_2.txt\n| └───dir_2\n| | └───file2_1.txt\n| | └───file2_2.txt\n└───index.md\n"
    );
  });
});

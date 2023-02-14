import fs from "fs";

const fileName = "./file.txt";

const createBigFile = async (
  file,
  numbersCount = 20000,
  maxNumber = 100000
) => {
  const stream = fs.createWriteStream(file);
  for (let i = 0; i < numbersCount; i++) {
    const n = Math.floor(Math.random() * maxNumber);
    await stream.write(n + "\n");
  }
  await stream.close();
};

(async () => {
  createBigFile(fileName);
})();

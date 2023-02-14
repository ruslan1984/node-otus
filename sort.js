import fs from "fs";
import { writeFile } from "node:fs/promises";

const fileName = "./file.txt";
const tmpDir = "./tmp";
let lastStr = "";
let resStream;

// Разбитие и сортировака файла
const spreadFile = async (file) => {
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir);
  }

  const spreadStream = fs.createReadStream(file);
  let chankCount = 0;
  try {
    return await spreadStream
      .on("data", async (chunk) => {
        const str = lastStr + chunk.toString();
        const lastSymbol = str.slice(-1);
        const arr = str
          .slice(lastSymbol)
          .split("\n")
          .filter((item) => item);

        if (lastSymbol !== "\n") {
          lastStr = arr.pop();
        } else {
          lastStr = "";
        }

        arr.sort((a, b) => {
          if (Number(a) > Number(b)) return 1;
          if (Number(a) < Number(b)) return -1;
          return 0;
        });

        const res = arr.join("\n");
        await writeFile(`${tmpDir}/chunk${chankCount++}.txt`, res);
      })
      .on("end", () => {
        spreadStream.close();
      });
  } catch (e) {
    console.error(e.message);
  }
};

// создать поток
async function getStream(file) {
  if (!fs.existsSync(file)) {
    return false;
  }
  return await fs.createReadStream(file, {
    encoding: "utf8",
    highWaterMark: 1,
  });
}

// создать генератор
async function* getGenerator(stream) {
  for await (const chunk of stream) {
    yield chunk;
  }
  return;
}

// получить число
async function getSymbol(generator) {
  let str = "";
  let v = "";
  let n;
  while (v !== "\n" && !n?.done) {
    n = await generator.next();
    if (n?.done) break;
    v = n.value;
    str += v;
  }
  if (n?.done) return str === "" ? null : str;
  return str;
}

// получть массив потоков для инициализации
const initStreams = async () => {
  let i = 0;
  let file = `${tmpDir}/chunk${i}.txt`;
  const arrStreams = [];
  while (fs.existsSync(file)) {
    const stream = await getStream(file);
    arrStreams.push(await stream);
    i++;
    file = `${tmpDir}/chunk${i}.txt`;
  }
  return arrStreams;
};

// получть массив генераторов для инициализации
const initGenerators = (streams) => streams.map((item) => getGenerator(item));

const initTotalArray = async (generators) => {
  return generators.map(async (generator, index) => {
    const symbol = await getSymbol(generator);
    return { key: index, symbol: Number(symbol) };
  });
};

// обработка
const sorting = async (sortArr, generators) => {
  if (!sortArr) return;
  const isEmty = sortArr.find((item) => !item.symbol);
  if (isEmty) {
    const key = isEmty.key;
    const symbol = await getSymbol(generators[key]);
    let newArr;
    if (symbol !== null) {
      newArr = sortArr.map((item) =>
        item.key === key ? { key, symbol: Number(symbol) } : item
      );
    } else {
      newArr = sortArr.filter((item) => item.key !== key);
    }

    if (newArr.length !== 0) {
      return await sorting(newArr, generators);
    } else {
      return;
    }
  }
  const min = sortArr.reduce((cur, next) =>
    cur.symbol > next.symbol ? next : cur
  );
  const newArr = sortArr.map((item) =>
    item.key === min.key ? { key: item.key, symbol: "" } : item
  );
  await resStream.write(min.symbol + "\n");
  await sorting(newArr, generators);
};

(async () => {
  const spread = await spreadFile(fileName);
  spread.on("end", () => {
    start();
  });
})();

const start = async () => {
  resStream = await fs.createWriteStream(fileName);
  const streams = await initStreams();
  const generators = await initGenerators(streams);
  const arr = await initTotalArray(generators);
  Promise.all(arr)
    .then(async (sortArr) => {
      console.log("start");
      await sorting(sortArr, generators);
    })
    .finally(async () => {
      await resStream.close();
      streams.map((item) => {
        item.close();
      });
      fs.rmSync(tmpDir, { recursive: true, force: true });
      console.log("finish");
    });
};

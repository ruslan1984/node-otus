#Домашняя работа 1

разработана функция построения дерева катлога

```javascript
three(dir, (depth = 2), (curLevel = 0));
```

принимает параметры
**@dir** - путь до дирктории у которого нужно узнать уровень вложенности (поумлочанию текущая)
**@depth** - максимальная глубина просмотра
**@curLevel** - текужий уровень обхода. этот параметр при вызовае передаваь не стоит, нужен только для рекурсивного обхода

### Пример вызова из консли

```node
node script.js  depth=<глубина вложенности> dir=<Путь до директоии>
```

###### Например

```node
node script.js  depth=1 dir=/var/www/some_site/
```

### Исходный код функции

```javascript
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
```

### Пример результата

```
└───folder_1
| └───file_1.txt
| └───folder_1_1
| | └───file_in_1_1.txt
| └───other_file_1.txt
└───folder_2
| └───file_2.txt
| └───folder_2_1
| | └───file_in_2_1.txt
| └───other_file_2.txt
└───package.json
└───script.js
```

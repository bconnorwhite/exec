# @bconnorwhite/exec
![dependencies](https://img.shields.io/david/bconnorwhite/exec)
![minzipped size](https://img.shields.io/bundlephobia/minzip/@bconnorwhite/exec)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/exec)
![npm](https://img.shields.io/npm/v/@bconnorwhite/exec)

Execute commands while keeping flags easily configurable as an object.

```
yarn add @bconnorwhite/exec
```

- Run one or multiple commands
- Run commands in parallel or series
- Automatically pass through output by setting `stdio: "inherit"`

### API
---
#### exec
###### Types
```ts
exec(command: string, flags?: Flags) => void

type Flags = {
  [flag: string]: string | boolean;
}
```
###### Usage
```js
import exec from "@bconnorwhite/exec";

exec("babel ./src", {
  "out-dir": "./build",
  "config-file": "./babel.config.json",
  "watch": true
});
// babel ./src --out-dir ./build --config-file ./babel.config.json --watch
```

---

#### execAll
###### Types
```ts
execAll(commands: Command[], options: Options) => void

type Command = {
  command: string;
  flags?: Flags;
}

type Options = {
  parallel?: boolean; // true will separate commands by &, false or undefined by &&.
}
```
###### Usage
```js
import { execAll } from "@bconnorwhite/exec";

execAll([{
  command: "babel ./src",
  flags: {
    "out-dir": "./build",
    "config-file": "./babel.config.json",
    "watch": true
  }
}, {
  command: "tsc --emitDeclarationOnly"
}], {
  parallel: false
});
// babel ./src --out-dir ./build --config-file ./babel.config.json --watch && tsc --emitDeclarationOnly
```

---

#### flag
###### Types
```ts
flag(command: string, options: Options) => string

type Options = {
  parallel?: boolean; // true will separate commands by &, false or undefined by &&.
}
```
###### Usage
```js
import { flag } from "@bconnorwhite/exec";

flag("babel ./src", {
  "out-dir": "./build",
  "config-file": "./babel.config.json",
  "watch": true
});
// babel ./src --out-dir ./build --config-file ./babel.config.json --watch
```

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
- Easily define arguments and flags
- Run commands in parallel or series
- Inject environment variables
- Set verbose to pass through output

### API
---
#### exec
###### Types
```ts
exec(command: Command) => ChildProcess | SpawnSyncReturns<Buffer>

type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  env?: NodeJS.ProcessEnv;
  verbose?: boolean;
}

type Flags = {
  [flag: string]: string | boolean | string[] | undefined;
}
```
###### Usage
```js
import exec from "@bconnorwhite/exec";

exec({
  command: "babel",
  args: "./src", // for multiple args, use an array instead
  flags: {
    "out-dir": "./build",
    "config-file": "./babel.config.json",
    "w": true // single character flags will be set using a single dash
  }
});

// Equivalent of:
// babel ./src --out-dir ./build --config-file ./babel.config.json -w
```

---

#### execAll
###### Types
```ts
execAll(
  commands: Command[],
  options: Options
) => Promise<(ChildProcess | SpawnSyncReturns<Buffer>)[]>

type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  env?: NodeJS.ProcessEnv;
  verbose?: boolean;
}

type Options = {
  env?: NodeJS.ProcessEnv; // default, will not override individual commands
  verbose?: boolean; // default, will not override individual commands
  parallel?: boolean;
}
```
###### Usage
```js
import { execAll } from "@bconnorwhite/exec";

execAll([{
  command: "babel",
  args: ["./src"],
  flags: {
    "out-dir": "./build",
    "config-file": "./babel.config.json",
    "watch": true
  }
}, {
  command: "tsc",
  flags: {
    "emitDeclarationOnly": true
  }
}], {
  env: {
    NODE_ENV: "development"
  },
  verbose: true,
  parallel: false
});
// Equivalent of:
// NODE_ENV=development babel ./src --out-dir ./build --config-file ./babel.config.json --watch && tsc --emitDeclarationOnly
```

---

#### flagsToArgs

###### Types
```ts
flagsToArgs(flags?: Flags) => string[]

type Flags = {
  [flag: string]: string | boolean | string[] | undefined;
}
```
###### Usage
```js
import { flagsToArgs } from "@bconnorwhite/exec";

flagsToArgs({
  "out-dir": "./build",
  "config-file": "./babel.config.json",
  "watch": true
});
// ["--out-dir", "./build", "--config-file", "./babel.config.json", "--watch"]
```

flagsToArgs is useful for adding flags that must preceed later arguments. For example:

```ts
import { flagsToArgs } from "@bconnorwhite/exec";

const files = [...];

exec({
  command: "wc",
  args: flagsToArgs({ l: true }).concat(files)
});
// Equivalent of:
// wc -l [FILES]...
```

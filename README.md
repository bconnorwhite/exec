# @bconnorwhite/exec
![npm](https://img.shields.io/npm/v/@bconnorwhite/exec)
![typescript](https://img.shields.io/github/languages/top/bconnorwhite/exec)
![dependencies](https://img.shields.io/david/bconnorwhite/exec)

Execute commands while keeping flags easily configurable as an object.

```
yarn add @bconnorwhite/exec
```

- Run one or multiple commands
- Easily define arguments and flags
- Run commands in parallel or series
- Inject environment variables
- Set silent to ignore output


### API

- [exec](#exec)  
- [execSync](#execSync)  
- [execAll](#execAll)  
- [flagsToArgs](#flagsToArgs)

---
#### exec
###### Usage
```js
import exec from "@bconnorwhite/exec";

// Simple usage:
exec("echo", "hello");

// Object usage:
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
###### Types
```ts
exec(command: string, args: Args, flags: Flags, { env, silent }: Options): Promise<ExecResult>;
exec({ command, args, flags, env, silent }: Command): Promise<ExecResult>;

type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  silent?: boolean;
}

type Flags = {
  [flag: string]: string | boolean | string[] | undefined;
}

type ExecResult = {
  error: string;
  output: string;
  jsonOutput: () => JSONObject | undefined;
  jsonError: () => JSONObject | undefined;
}
```

#### execSync
###### Usage
```js
import { execSync } from "@bconnorwhite/exec";

// Simple usage:
execSync("echo", "hello");

// Object usage:
execSync({
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
###### Types
```ts
execSync(command: string, args: Args, flags: Flags, { env, silent }: Options): ExecResult;
execSync({ command, args, flags, env, silent }: Command): ExecResult;

```

---

#### execAll
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
  parallel: false
});
// Equivalent of:
// NODE_ENV=development babel ./src --out-dir ./build --config-file ./babel.config.json --watch && tsc --emitDeclarationOnly
```
###### Types
```ts
execAll(
  commands: Command[],
  options: ExecAllOptions
) => Promise<ExecResult[]>

type ExecAllOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv; // default, will not override individual commands
  silent?: boolean; // default, will not override individual commands
  parallel?: boolean;
}
```

---

#### flagsToArgs

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
###### Types
```ts
flagsToArgs(flags?: Flags) => string[]

type Flags = {
  [flag: string]: string | boolean | string[] | undefined;
}
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

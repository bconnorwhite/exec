<div align="center">
  <h1>@bconnorwhite/exec</h1>
  <a href="https://npmjs.com/package/@bconnorwhite/exec">
    <img alt="npm" src="https://img.shields.io/npm/v/@bconnorwhite/exec.svg">
  </a>
  <a href="https://github.com/bconnorwhite/bob">
    <img alt="typescript" src="https://img.shields.io/github/languages/top/bconnorwhite/bob.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/exec?branch=master">
    <img alt="Coveralls Status" src="https://img.shields.io/coveralls/github/bconnorwhite/exec.svg?branch=master">
  </a>
  <a href="https://github.com/bconnorwhite/exec">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/bconnorwhite/exec?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> Execute commands while keeping flags easily configurable as an object.

- Run one or multiple commands in parallel or series
- Easily define arguments and flags
- Easily extract JSON output
- Inject environment variables
- Set `silent` to block CLI output

## Installation

```bash
yarn add @bconnorwhite/exec
```

```bash
npm install @bconnorwhite/exec
```

## API

- [exec](#exec)  
- [execSync](#execsync)  
- [execAll](#execall)  
- [executableToString](#executabletostring)

<br />

### exec

#### Usage

```js
import { exec } from "@bconnorwhite/exec";

// Simple usage:
exec("echo", "hello");

// Explicit usage:
exec({
  command: "babel",
  args: [
    "./src",
    { // Objects are used for flags
      "out-dir": "./build",
      "config-file": "./babel.config.json",
      "w": true // single character flags will be set using a single dash
    }
  ]
});

// Equivalent of:
// babel ./src --out-dir ./build --config-file ./babel.config.json -w
```

#### Types

```ts
function exec(command: string, args: Args, { env, silent }: Options): Promise<ExecResult>;
function exec({ command, args, env, silent, cwd }: Executable): Promise<ExecResult>;

type Executable = {
  command: string;
  args?: Args;
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  silent?: boolean;
}

type Args = Arg | Arg[];

type Arg = string | Flags;

type Flags = {
  [flag: string]: string | number | boolean  | string[] | undefined;
}

type ExecResult = {
  output: string;
  error: string;
  textOutput: string; // output stripped on ANSI colors
  textError: string; // error stripped on ANSI colors
  jsonOutput: () => JSONObject | JSONArray | undefined; // First JSON object or array in output
  jsonError: () => JSONObject | JSONArray | undefined; // First JSON object or array in error
}
```

<br />

### execSync

#### Usage

```js
import { execSync } from "@bconnorwhite/exec";

// Simple usage:
execSync("echo", "hello");

// Object usage:
execSync({
  command: "babel",
  args: [
    "./src",
    { // Objects are used for flags
      "out-dir": "./build",
      "config-file": "./babel.config.json",
      "w": true // single character flags will be set using a single dash
    }
  ]
});

// Equivalent of:
// babel ./src --out-dir ./build --config-file ./babel.config.json -w
```
### Types
```ts
function execSync(command: string, args: Args, { env, silent }: Options): ExecResult;
function execSync({ command, args, env, silent }: Executable): ExecResult;

```

<br />

### execAll

#### Usage

```js
import { execAll } from "@bconnorwhite/exec";

execAll([{
  command: "babel",
  args: [
    "./src",
    { // Objects are used for flags
      "out-dir": "./build",
      "config-file": "./babel.config.json",
      "w": true // single character flags will be set using a single dash
    }
  ]
}, {
  command: "tsc",
  args: {
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
#### Types
```ts
function execAll(
  executables: Executable[],
  options: ExecAllOptions
): Promise<ExecResult[]>;

type ExecAllOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv; // default, will not override individual commands
  silent?: boolean; // default, will not override individual commands
  parallel?: boolean;
}
```

<br />

### executableToString

#### Usage

```js
import { executableToString } from "@bconnorwhite/exec";

executableToString({
  command: "foo",
  args: [
    "a",
    "b",
    {
      c: true,
      d: "ok",
      long: true
    }
  ]
});
// "foo a b -c -d ok --long"
```

#### Types

```ts
function executableToString(command: Executable): string;

type Executable = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  env?: NodeJS.ProcessEnv;
}
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/exec.svg"></h2>

- [as-typed-array](https://npmjs.com/package/as-typed-array): Make any value an array, and maintain types
- [cross-spawn](https://npmjs.com/package/cross-spawn): Cross platform child_process#spawn and child_process#spawnSync
- [parse-json-object](https://npmjs.com/package/parse-json-object): Parse a typed JSON object.
- [strip-ansi](https://npmjs.com/package/strip-ansi): Strip ANSI escape codes from a string
- [terminating-newline](https://npmjs.com/package/terminating-newline): Add or remove a terminating newline

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/exec.svg"></h2>

- [@bconnorwhite/bob](https://npmjs.com/package/@bconnorwhite/bob): Bob builds and watches typescript projects.
- [@types/cross-spawn](https://npmjs.com/package/@types/cross-spawn): TypeScript definitions for cross-spawn
- [@types/node](https://npmjs.com/package/@types/node): TypeScript definitions for Node.js
- [coveralls](https://npmjs.com/package/coveralls): Takes json-cov output into stdin and POSTs to coveralls.io
- [jest](https://npmjs.com/package/jest): Delightful JavaScript Testing.

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/@bconnorwhite/exec.svg"></h2>

[MIT](https://mit-license.org/)

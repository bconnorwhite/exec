import * as child_process from "child_process";

export type SpawnOptionsWithStdio = child_process.SpawnOptions & {
  stdio: ["inherit", "pipe", "pipe"];
};

export type SpawnOptions = {
  env?: NodeJS.ProcessEnv;
  cwd?: string;
};

export type OutputOptions = {
  silent?: boolean;
};

export type Options = SpawnOptions & OutputOptions;

export function getSpawnOptions({ cwd, env }: SpawnOptions): SpawnOptionsWithStdio {
  return {
    cwd,
    env: {
      ...process.env,
      FORCE_COLOR: "1",
      CLI_WIDTH: typeof process.stdout.getWindowSize === "function" ? process.stdout.getWindowSize()[0].toString() : undefined,
      ...(env ?? {})
    },
    stdio: ["inherit", "pipe", "pipe"]
  };
}

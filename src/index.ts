import exec from "./exec";
import execSync from "./exec-sync";
import execAll, { ExecAllOptions } from "./exec-all";
import { JSONObject } from "parse-json-object";
import { getArgs, flagsToArgs, Args, Flags } from "./args";

export type SpawnOptions = {
  env?: NodeJS.ProcessEnv;
  cwd?: string;
}

export type OutputOptions = {
  silent?: boolean;
}

export type Options = SpawnOptions & OutputOptions;

export type Command = {
  command: string;
  args?: Args;
  flags?: Flags;
} & Options;

export type ExecResult = {
  error: string;
  output: string;
  jsonOutput: () => JSONObject | undefined;
  jsonError: () => JSONObject | undefined;
}

export function getSpawnOptions({ cwd, env }: SpawnOptions) {
  return {
    cwd,
    env: {
      ...process.env,
      ...env
    }
  }
}

export function commandToString({ command, args, flags }: Command) {
  return `${command} ${getArgs(args, flags).join(" ")}`;
}

export default exec;

export {
  exec,
  execSync,
  execAll,
  flagsToArgs,
  Flags,
  ExecAllOptions,
  JSONObject
}

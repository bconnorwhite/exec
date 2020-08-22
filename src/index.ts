import exec from "./exec";
import execSync from "./exec-sync";
import execAll, { ExecAllOptions } from "./exec-all";
import { JSONObject } from "parse-json-object";
import flagsToArgs, { Flags } from "./flag";

export type SpawnOptions = {
  env?: NodeJS.ProcessEnv;
  cwd?: string;
}

export type OutputOptions = {
  silent?: boolean;
}

export type Options = SpawnOptions & OutputOptions;

export type Args = string | string[];

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

export function getArgs(args: string | string[] = [], flags: Flags = {}) {
  let retval: string[] = [];
  if(typeof args === "string") {
    retval.push(args);
  } else {
    retval = retval.concat(args);
  }
  return retval.concat(flagsToArgs(flags));
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

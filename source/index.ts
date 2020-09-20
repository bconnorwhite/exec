import exec from "./exec";
import execSync from "./exec-sync";
import execAll, { ExecAllOptions } from "./exec-all";
import { JSONObject } from "parse-json-object";
import { flagsToArgs, Args, Flags } from "./args";
import { commandToString } from "./utils";

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
  colorError: string;
  colorOutput: string;
  jsonOutput: () => JSONObject | undefined;
  jsonError: () => JSONObject | undefined;
}

export default exec;

export {
  exec,
  execSync,
  execAll,
  flagsToArgs,
  commandToString,
  Flags,
  ExecAllOptions,
  JSONObject
}

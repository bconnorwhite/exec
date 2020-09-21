import { JSONObject, JSONArray } from "extract-first-json";
import exec from "./exec";
import execSync from "./exec-sync";
import execAll, { ExecAllOptions, execAllSeries, execAllParallel, execAllSync } from "./exec-all";
import { Arg, Args, Flag, Flags } from "./args";
import { Options } from "./options";
import { executableToString } from "./utils";

export type Executable = {
  command: string;
  args?: Args;
} & Options;

export type ExecResult = {
  error: string;
  output: string;
  textError: string;
  textOutput: string;
  jsonOutput: () => JSONObject | JSONArray | undefined;
  jsonError: () => JSONObject | JSONArray | undefined;
}

export {
  exec,
  execSync,
  execAll,
  execAllSync,
  execAllParallel,
  execAllSeries,
  executableToString,
  Arg,
  Args,
  Flag,
  Flags,
  Options,
  ExecAllOptions,
  JSONObject,
  JSONArray
}

import { SpawnSyncReturns } from "child_process";
import { sync as spawnSync } from "cross-spawn";
import stripAnsi from "strip-ansi";
import { extractJSON } from "extract-first-json";
import { removeTerminatingNewline } from "terminating-newline";
import { Executable, Options, ExecResult } from "./";
import { getArgs, Args } from "./args";
import { getSpawnOptions, SpawnOptionsWithStdio, OutputOptions } from "./options";

function getResult({ stdout, stderr }: SpawnSyncReturns<Buffer>, { silent }: OutputOptions) {
  if(silent !== true) {
    process.stdout.write(stdout ?? "");
    process.stderr.write(stderr ?? "");
  }
  const output = stdout ? removeTerminatingNewline(stdout).toString() : "";
  const error = stderr ? removeTerminatingNewline(stderr).toString() : "";
  const textOutput = stripAnsi(output);
  const textError = stripAnsi(error);
  return {
    output,
    error,
    textOutput,
    textError,
    jsonOutput: () => extractJSON(textOutput),
    jsonError: () => extractJSON(textError)
  }
}

function run(command: string, args: string[], spawnOptions: SpawnOptionsWithStdio, outputOptions: OutputOptions) {
  const child = spawnSync(command, args, spawnOptions);
  return getResult(child, outputOptions);
}

export default function execSync(command: string, args?: Args, options?: Options): ExecResult;
export default function execSync({ command, args, cwd, env, silent }: Executable): ExecResult;
export default function execSync(cmd: string | Executable, args?: Args, options: Options = {}): ExecResult {
  if(typeof cmd === "string") {
    const spawnOptions = getSpawnOptions({
      cwd: options.cwd,
      env: options.env
    });
    return run(cmd, getArgs(args), spawnOptions, { silent: options.silent });
  } else {
    const spawnOptions = getSpawnOptions({
      cwd: cmd.cwd,
      env: cmd.env
    });
    return run(cmd.command, getArgs(cmd.args), spawnOptions, { silent: cmd.silent });
  }
}

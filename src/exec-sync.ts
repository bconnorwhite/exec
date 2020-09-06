import { spawnSync } from "child_process";
import parse from "parse-json-object";
import stripAnsi from "strip-ansi";
import { removeTerminatingNewline } from "terminating-newline";
import { getSpawnOptions, Command, Options, ExecResult, SpawnOptions, OutputOptions } from "./";
import { getArgs, Args, Flags } from "./args";

function getResult({ stdout, stderr }: { stdout: Buffer | null, stderr: Buffer | null }, { silent }: OutputOptions) {
  if(silent !== true) {
    process.stdout.write(stdout ?? "");
    process.stderr.write(stderr ?? "");
  }
  const outputString = stdout ? removeTerminatingNewline(stdout).toString() : "";
  const errorString = stderr ? removeTerminatingNewline(stderr).toString() : "";
  return {
    output: stripAnsi(outputString),
    error: stripAnsi(errorString),
    colorOutput: outputString,
    colorError: outputString,
    jsonOutput: () => parse(stripAnsi(outputString)),
    jsonError: () => parse(stripAnsi(errorString))
  }
}

function run(command: string, args: string[], spawnOptions: SpawnOptions, outputOptions: OutputOptions) {
  const child = spawnSync(command, args, spawnOptions);
  return getResult(child, outputOptions);
}

export default function execSync(command: string, args: Args, flags: Flags, { cwd, env, silent }: Options): ExecResult;
export default function execSync({ command, args, flags, cwd, env, silent }: Command): ExecResult;
export default function execSync(cmd: string | Command, args?: Args, flags?: Flags, options: Options = {}): ExecResult {
  if(typeof cmd === "string") {
    const argsList = getArgs(args, flags);
    const spawnOptions = getSpawnOptions({
      cwd: options.cwd,
      env: options.env
    });
    return run(cmd, argsList, spawnOptions, { silent: options.silent });
  } else {
    const argsList = getArgs(cmd.args, cmd.flags);
    const spawnOptions = getSpawnOptions({
      cwd: cmd.cwd,
      env: cmd.env
    });
    return run(cmd.command, argsList, spawnOptions, { silent: cmd.silent });
  }
}

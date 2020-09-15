import { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "cross-spawn";
import stripAnsi from "strip-ansi";
import parse from "parse-json-object";
import { removeTerminatingNewline } from "terminating-newline";
import { getSpawnOptions, Command, Options, ExecResult, SpawnOptions, OutputOptions } from "./";
import { getArgs, Args, Flags } from "./args";

function getResult(child: ChildProcessWithoutNullStreams, { silent }: OutputOptions): Promise<ExecResult> {
  return new Promise((resolve) => {
    if(silent !== true) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    let output: any[] = [];
    let error: any[] = [];
    child.stdout.on("data", (chunk) => {
      output.push(chunk);
    });
    child.stderr.on("data", (chunk) => {
      error.push(chunk);
    });
    child.on("close", () => {
      const outputString = removeTerminatingNewline(Buffer.concat(output)).toString();
      const errorString = removeTerminatingNewline(Buffer.concat(error)).toString();
      resolve({
        output: stripAnsi(outputString),
        error: stripAnsi(errorString),
        colorOutput: outputString,
        colorError: errorString,
        jsonOutput: () => parse(stripAnsi(outputString)),
        jsonError: () => parse(stripAnsi(errorString))
      });
    });
  });
}

function run(command: string, args: string[], spawnOptions: SpawnOptions, outputOptions: OutputOptions) {
  const child = spawn(command, args, spawnOptions);
  return getResult(child, outputOptions);
}

export default async function exec(command: string, args?: Args, flags?: Flags, options?: Options): Promise<ExecResult>;
export default async function exec({ command, args, flags, env, silent }: Command): Promise<ExecResult>;
export default async function exec(cmd: string | Command, args?: Args, flags?: Flags, options: Options = {}): Promise<ExecResult> {
  if(typeof cmd === "string") {
    const argsList = getArgs(args, flags);
    const spawnOptions = getSpawnOptions({
      cwd: options.cwd,
      env: options.env
    });
    return run(cmd, argsList, spawnOptions, {
      silent: options.silent
    });
  } else {
    const argsList = getArgs(cmd.args, cmd.flags);
    const spawnOptions = getSpawnOptions({
      cwd: cmd.cwd,
      env: cmd.env
    });
    return run(cmd.command, argsList, spawnOptions, {
      silent: cmd.silent
    });
  }
}

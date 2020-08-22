import { spawn, ChildProcessWithoutNullStreams } from "child_process";
import parse from "parse-json-object";
import stripFinalNewline from "./strip-final-newline";
import { getArgs, getSpawnOptions, Args, Flags, Command, Options, ExecResult, SpawnOptions, OutputOptions } from "./";

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
      const outputString = stripFinalNewline(Buffer.concat(output)).toString();
      const errorString = stripFinalNewline(Buffer.concat(error)).toString();
      resolve({
        output: outputString,
        error: errorString,
        jsonOutput: () => parse(outputString),
        jsonError: () => parse(errorString)
      });
    });
  });
}

function run(command: string, args: string[], spawnOptions: SpawnOptions, outputOptions: OutputOptions) {
  const child = spawn(command, args, spawnOptions);
  return getResult(child, outputOptions);
}

export default async function exec(command: string, args: Args, flags: Flags, { env, silent }: Options): Promise<ExecResult>;
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

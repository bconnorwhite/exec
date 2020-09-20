import { ChildProcessByStdio } from "child_process";
import { Readable } from "stream";
import { spawn } from "cross-spawn";
import stripAnsi from "strip-ansi";
import { extractJSON } from "extract-first-json";
import { removeTerminatingNewline } from "terminating-newline";
import { Executable, Options, ExecResult } from "./";
import { getSpawnOptions, OutputOptions, SpawnOptionsWithStdio } from "./options";
import { getArgs, Args } from "./args";

function getResult(child: ChildProcessByStdio<null, Readable, Readable>, { silent }: OutputOptions): Promise<ExecResult> {
  return new Promise((resolve) => {
    if(silent !== true) {
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    }
    const outputBuffer: any[] = [];
    const errorBuffer: any[] = [];
    child.stdout.on("data", (chunk) => {
      outputBuffer.push(chunk);
    });
    child.stderr.on("data", (chunk) => {
      errorBuffer.push(chunk);
    });
    child.on("close", () => {
      const output = removeTerminatingNewline(Buffer.concat(outputBuffer)).toString();
      const error = removeTerminatingNewline(Buffer.concat(errorBuffer)).toString();
      const textOutput = stripAnsi(output);
      const textError = stripAnsi(output);
      resolve({
        output,
        error,
        textOutput,
        textError,
        jsonOutput: () => extractJSON(textOutput),
        jsonError: () => extractJSON(textError)
      });
    });
  });
}

function run(command: string, args: string[], spawnOptions: SpawnOptionsWithStdio, outputOptions: OutputOptions) {
  const child = spawn(command, args, spawnOptions);
  return getResult(child, outputOptions);
}

export default async function exec(command: string, args?: Args, options?: Options): Promise<ExecResult>;
export default async function exec({ command, args, env, silent }: Executable): Promise<ExecResult>;
export default async function exec(cmd: string | Executable, args?: Args, options: Options = {}): Promise<ExecResult> {
  if(typeof cmd === "string") {
    const spawnOptions = getSpawnOptions({
      cwd: options.cwd,
      env: options.env
    });
    return run(cmd, getArgs(args), spawnOptions, {
      silent: options.silent
    });
  } else {
    const spawnOptions = getSpawnOptions({
      cwd: cmd.cwd,
      env: cmd.env
    });
    return run(cmd.command, getArgs(cmd.args), spawnOptions, {
      silent: cmd.silent
    });
  }
}

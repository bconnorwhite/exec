import { spawn, spawnSync, ChildProcess, SpawnSyncReturns } from "child_process";
import flagsToArgs, { Flags } from "./flag";

export type Command = {
  command: string;
  args?: string[];
  flags?: Flags;
}

export type Options = {
  parallel?: boolean;
}

function getArgs(args: string[] = [], flags: Flags = {}) {
  return args.concat(flagsToArgs(flags));
}

const exec = (command: string, args: string[] = [], flags: Flags = {}, parallel = false) => {
  const argList = getArgs(args, flags);
  if(parallel) {
    return spawn(command, argList, { stdio: "inherit" });
  } else {
    return spawnSync(command, argList, { stdio: "inherit" });
  }
}

export function execAll(commands: Command[], options: Options = {}) {
  return commands.reduce((retval, { command, args, flags }) => {
    retval.push(exec(command, args, flags, options.parallel));
    return retval;
  }, ([] as (ChildProcess | SpawnSyncReturns<Buffer>)[]));
}

export default exec;

export {
  flagsToArgs
}

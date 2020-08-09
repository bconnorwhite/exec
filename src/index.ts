import { spawn, spawnSync, ChildProcess, SpawnSyncReturns } from "child_process";
import flagsToArgs, { Flags } from "./flag";

export type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
}

export type Options = {
  parallel?: boolean;
}

function getArgs(args: string | string[] = [], flags: Flags = {}) {
  let retval: string[] = [];
  if(typeof args === "string") {
    retval.push(args);
  } else {
    retval = retval.concat(args);
  }
  return retval.concat(flagsToArgs(flags));
}

const exec = (command: string, args: string | string[] = [], flags: Flags = {}, parallel = false) => {
  const argList = getArgs(args, flags);
  if(parallel) {
    return spawn(command, argList, { stdio: "inherit" });
  } else {
    return spawnSync(command, argList, { stdio: "inherit" });
  }
}

export async function execAll(commands: (Command | Promise<Command>)[], options: Options = {}) {
  return Promise.all(commands).then((commandList) => {
    return commandList.reduce((retval, { command, args, flags }) => {
      retval.push(exec(command, args, flags, options.parallel));
      return retval;
    }, ([] as (ChildProcess | SpawnSyncReturns<Buffer>)[]));
  });
}

export default exec;

export {
  flagsToArgs
}

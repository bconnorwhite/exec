import { spawn, spawnSync, ChildProcess, SpawnSyncReturns } from "child_process";
import flag, { Flags } from "./flag";

export type Command = {
  command: string;
  flags?: Flags;
}

type Options = {
  parallel?: boolean;
}

const exec = (command: string, flags?: Flags, parallel = false) => {
  const commandString = flag(command, flags);
  if(parallel) {
    return spawn(commandString, { stdio: "inherit", shell: true });
  } else {
    return spawnSync(commandString, { stdio: "inherit", shell: true });
  }
}

export function execAll(commands: Command[], options: Options = {}) {
  return commands.reduce((retval, { command, flags }) => {
    retval.push(exec(command, flags, options.parallel));
    return retval;
  }, ([] as (ChildProcess | SpawnSyncReturns<Buffer>)[]));
}

export default exec;

export {
  flag
}

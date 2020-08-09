import { spawn, spawnSync, ChildProcess, SpawnSyncReturns } from "child_process";
import flagsToArgs, { Flags } from "./flag";

export type Command = {
  command: string;
  args?: string | string[];
  flags?: Flags;
  env?: NodeJS.ProcessEnv;
}

export type ExecAllOptions = {
  env?: NodeJS.ProcessEnv;
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

function mergeEnv(env: NodeJS.ProcessEnv = {}) {
  return {
    ...process.env,
    ...env
  }
}

const exec = ({ command, args, flags, env }: Command) => {
  const argsList = getArgs(args, flags);
  return spawn(command, argsList, {
    env: mergeEnv(env),
    stdio: "inherit"
  });
}

const execSync = ({ command, args, flags, env }: Command) => {
  const argsList = getArgs(args, flags);
  return spawnSync(command, argsList, {
    env: mergeEnv(env),
    stdio: "inherit"
  });
}

export async function execAll(commands: (Command | Promise<Command>)[], options: ExecAllOptions = {}) {
  return Promise.all(commands).then((commandList) => {
    return commandList.reduce((retval, command) => {
      const payload = {
        env: options.env,
        ...command
      };
      if(options.parallel) {
        retval.push(exec(payload));
      } else {
        retval.push(execSync(payload));
      }
      return retval;
    }, ([] as (ChildProcess | SpawnSyncReturns<Buffer>)[]));
  });
}

export default execSync;

export {
  flagsToArgs,
  Flags
}

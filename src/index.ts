import { execSync } from "child_process";
import flag, { Flags } from "./flag";

export type Command = {
  command: string;
  flags?: Flags;
}

type Options = {
  parallel?: boolean;
}

function buildCommand(commands: Command | Command[], { parallel = false }: Options) {
  const operator = parallel ? "&" : "&&";
  if(Array.isArray(commands)) {
    return commands.reduce((retval, command) => `${retval ? `${retval} ${operator} ` : ""}${flag(command.command, command.flags)}`, "");
  } else {
    return flag(commands.command, commands.flags);
  }
}

export function execAll(commands: Command[], options: Options = {}) {
  return exec(buildCommand(commands, options));
}

const exec = (command: string, flags?: Flags) => {
  const commandString = flag(command, flags);
  return execSync(commandString, { stdio: "inherit" });
}

export default exec;

export {
  flag
}

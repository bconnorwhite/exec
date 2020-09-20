import { Executable } from "./";
import { getArgs } from "./args";

export function executableToString({ command, args }: Executable) {
  return `${command} ${getArgs(args).join(" ")}`;
}

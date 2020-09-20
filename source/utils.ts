import { Command, SpawnOptions } from "./";
import { getArgs } from "./args";

export function getSpawnOptions({ cwd, env }: SpawnOptions): SpawnOptions {
  return {
    cwd,
    env: {
      ...process.env,
      FORCE_COLOR: "1",
      ...env
    }
  }
}

export function commandToString({ command, args, flags }: Command) {
  return `${command} ${getArgs(args, flags).join(" ")}`;
}

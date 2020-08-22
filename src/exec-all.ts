import { exec, execSync, Command, ExecResult, Options } from "./";

export type ExecAllOptions = {
  parallel?: boolean;
} & Options;

export default async function execAll(commands: (Command | Promise<Command>)[], options: ExecAllOptions = {}) {
  return Promise.all(commands).then((commandList) => {
    return commandList.reduce((retval, command) => {
      const payload = {
        cwd: options.cwd,
        env: options.env,
        silent: options.silent,
        ...command
      };
      if(options.parallel) {
        retval.push(exec(payload));
      } else {
        retval.push(Promise.resolve(execSync(payload)));
      }
      return retval;
    }, ([] as Promise<ExecResult>[]));
  });
}

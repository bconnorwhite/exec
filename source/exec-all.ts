import { exec, execSync, Executable, ExecResult, Options } from "./";

export type ExecAllOptions = {
  parallel?: boolean;
} & Options;

function getPayload(executable: Executable, options: Options) {
  return {
    cwd: options.cwd,
    env: options.env,
    silent: options.silent,
    ...executable
  };
}

export function execAllSync(executables: Executable[], options: Options = {}) {
  return executables.reduce((retval, executable) => {
    const payload = getPayload(executable, options);
    retval.push(execSync(payload));
    return retval;
  }, [] as ExecResult[]);
}

export async function execAllSeries(executables: Executable[], options: Options = {}) {
  return executables.reduce(async (retval, executable) => {
    return retval.then(async (results) => {
      const payload = getPayload(executable, options);
      return exec(payload).then((result) => {
        results.push(result);
        return results;
      });
    });
  }, Promise.resolve([] as ExecResult[]));
}

export async function execAllParallel(executables: Executable[], options: Options = {}) {
  return executables.reduce((retval, executable) => {
    const payload = getPayload(executable, options);
    retval.push(exec(payload));
    return retval;
  }, ([] as Promise<ExecResult>[]));
}

export default function execAll(executables: Executable[], options: ExecAllOptions = {}) {
  if(options.parallel) {
    return execAllParallel(executables, options);
  } else {
    return execAllSeries(executables, options);
  }
}

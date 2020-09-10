import { flag, Flags } from "./flags";

export type Args = string | string[];

export function flagsToArgs(flags: Flags = {}) {
  return Object.keys(flags).reduce((retval, key) => {
    const value = flags[key];
    if(value === true) {
      return retval.concat(flag(key));
    } else if(typeof value === "string") {
      return retval.concat([flag(key), value]);
    } else if(Array.isArray(value)) {
      return retval.concat(value.reduce((list, item) => {
        return list.concat([flag(key), item]);
      }, ([] as string[])));
    } else {
      return retval;
    }
  }, ([] as string[]));
}

function asArray(args: string | string[]) {
  if(Array.isArray(args)) {
    return args;
  } else {
    return [args];
  }
}

// flagsToArgs should independently quote its output which why concat is after map
export function getArgs(args: string | string[] = [], flags: Flags = {}) {
  return asArray(args).map((arg) => arg).concat(flagsToArgs(flags));
}

export {
  Flags
}

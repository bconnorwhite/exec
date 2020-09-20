import asArray from "as-typed-array";
import { flag, Flags } from "./flags";

export type Arg = string | Flags;

export type Args = Arg | Arg[];

export function flagsToArgs(flags: Flags = {}) {
  return Object.keys(flags).reduce((retval, key) => {
    const value = flags[key];
    if(value === true) {
      return retval.concat(flag(key));
    } else if(typeof value === "string") {
      return retval.concat([flag(key), value]);
    } else if(typeof value === "number") {
      return retval.concat([flag(key), value.toString()]);
    } else if(Array.isArray(value)) {
      return retval.concat(value.reduce((list, item) => {
        return list.concat([flag(key), item]);
      }, ([] as string[])));
    } else {
      return retval;
    }
  }, ([] as string[]));
}

// flagsToArgs should independently quote its output which why concat is after map
export function getArgs(args: Args = []) {
  return asArray(args).reduce((retval, arg) => {
    if(typeof arg === "string") {
      return retval.concat(arg);
    } else {
      return retval.concat(flagsToArgs(arg));
    }
  }, [] as string[]);
}

export {
  Flags
}

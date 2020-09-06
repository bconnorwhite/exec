
export type Flags = {
  [flag: string]: string | boolean | string[] | undefined;
}

export function flag(name: string) {
  if(name.length === 1) {
    return `-${name}`;
  } else {
    return `--${name}`
  }
}

export function spaceCheck(val: string) {
  if(val.includes(' ')) {
    let quoteChar = "\""
    return quoteChar.concat(val, quoteChar)
  } else {
    return val
  }
}

export default function(flags: Flags = {}) {
  return Object.keys(flags).reduce((retval, key) => {
    const value = flags[key];
    if(value === true) {
      return retval.concat(flag(key));
    } else if(typeof value === "string") {
      return retval.concat([flag(key), spaceCheck(value)]);
    } else if(Array.isArray(value)) {
      return retval.concat(value.reduce((list, item) => {
        return list.concat([flag(key), spaceCheck(item)]);
      }, ([] as string[])));
    } else {
      return retval;
    }
  }, ([] as string[]));
}

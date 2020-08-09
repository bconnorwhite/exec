
export type Flags = {
  [flag: string]: string | boolean | undefined;
}

export default function(flags: Flags = {}) {
  return Object.keys(flags).reduce((retval, key) => {
    const value = flags[key];
    if(value === true) {
      return retval.concat(`--${key}`);
    } else if(typeof value === "string") {
      return retval.concat([`--${key}`, value]);
    } else {
      return retval;
    }
  }, ([] as string[]));
}


export type Flags = {
  [flag: string]: string | boolean;
}

export default function(command: string, options: Flags = {}) {
  return Object.keys(options).reduce((retval, key) => {
    if(options[key] === true) {
      return `${retval} --${key}`;
    } else if(typeof options[key] === "string") {
      return `${retval} --${key} ${options[key]}`;
    } else {
      return retval;
    }
  }, command);
}

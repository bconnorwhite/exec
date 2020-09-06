
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

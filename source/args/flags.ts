
export type Flag = string | boolean | number | string[] | undefined;

export type Flags = {
  [flag: string]: Flag;
};

export function flag(name: string) {
  if(name.length === 1) {
    return `-${name}`;
  } else {
    return `--${name}`;
  }
}

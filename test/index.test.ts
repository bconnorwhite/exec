import { executableToString } from "../source";
import { flagsToArgs } from "../source/args";

test("executableToString", () => {
  expect(executableToString({
    command: "foo",
    args: ["a", "b", {
      c: true,
      d: "ok",
      long: true,
      num: 1,
      arr: ["a", "b"],
      skip: false
    }]
  })).toBe("foo a b -c -d ok --long --num 1 --arr a --arr b");
});

test("executableToString empty", () => {
  expect(executableToString({
    command: "foo"
  })).toBe("foo");
});

test("flagsToArgs empty", () => {
  expect(flagsToArgs()).toEqual([]);
});

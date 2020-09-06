const { commandToString } = require("../build/index.js");

test("exec output", () => {
  expect(commandToString({
    command: "foo",
    args: ["a", "b"],
    flags: {
      c: true,
      d: "ok"
    }
  })).toBe("foo a b -c -d ok");
});

test("exec output space check 1", () => {
  expect(commandToString({
    command: "foo",
    args: ["a", "b", "x y"],
    flags: {
      c: true,
      d: ["ok", "boo mer"]
    }
  })).toBe("foo a b \"x y\" -c -d ok -d \"boo mer\"");
});

test("exec output space check 2", () => {
  expect(commandToString({
    command: "foo",
    args: "x y",
    flags: {
      c: true,
      d: "ok dawg"
    }
  })).toBe("foo \"x y\" -c -d \"ok dawg\"");
});

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

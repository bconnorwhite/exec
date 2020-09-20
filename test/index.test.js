const { executableToString } = require("../build/index.js");

test("executableToString", () => {
  expect(executableToString({
    command: "foo",
    args: ["a", "b", {
      c: true,
      d: "ok"
    }]
  })).toBe("foo a b -c -d ok");
});

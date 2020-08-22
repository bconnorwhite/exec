const { execSync } = require("../build");

test("execSync output", () => {
  const output = execSync("echo", "hello", {}, { silent: true }).output;
  expect(output).toBe("hello");
});

test("execSync jsonOutput", () => {
  const output = execSync("echo", JSON.stringify({ ok: true }), {}, { silent: true }).jsonOutput();
  expect(output.ok).toBe(true);
});

test("execSync cwd", () => {
  const { output } = execSync("ls", ".", {}, { cwd: "tests", silent: true });
  expect(output).toBe("exec-all.test.js\nexec-sync.test.js\nexec.test.js");
});

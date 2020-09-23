import { execSync } from "../source";

test("execSync output no flags", () => {
  const output = execSync("echo", "hello", { silent: true }).output;
  expect(output).toBe("hello");
});

test("execSync output no silent", () => {
  const output = execSync("echo", "hello").output;
  expect(output).toBe("hello");
});

test("execSync output", () => {
  const output = execSync("echo", "hello", { silent: true }).output;
  expect(output).toBe("hello");
});

test("execSync jsonOutput", () => {
  const output = execSync("echo", JSON.stringify({ ok: true }), { silent: true }).jsonOutput();
  expect(output).toEqual({ ok: true });
});

test("execSync cwd", () => {
  const { output } = execSync("ls", ".", { cwd: "test", silent: true });
  expect(output.includes("exec-sync.test.ts")).toBe(true);
});

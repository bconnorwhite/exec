import { test, expect } from "@jest/globals";
import { exec } from "../source";

test("exec output no flags", () => {
  exec("echo", "hello", { silent: true }).then(({ output }) => {
    expect(output).toBe("hello");
  });
});

test("exec output no silent", () => {
  exec("echo", "hello").then(({ output }) => {
    expect(output).toBe("hello");
  });
});

test("exec output", () => {
  exec("echo", "hello", { silent: true }).then(({ output }) => {
    expect(output).toBe("hello");
  });
});

test("exec jsonOutput", () => {
  exec("echo", JSON.stringify({ ok: true }), { silent: true }).then(({ jsonOutput }) => {
    expect(jsonOutput()).toEqual({ ok: true });
  });
});

test("exec cwd", () => {
  exec("ls", ".", { cwd: "test", silent: true }).then(({ output }) => {
    expect(output).toContain("exec.test.ts");
  });
});

test("exec jsonOutput", () => {
  exec("echo", ["'Output: { \"ok\": true }'"], { silent: true }).then(({ jsonOutput }) => {
    expect(jsonOutput()).toEqual({ ok: true });
  });
});

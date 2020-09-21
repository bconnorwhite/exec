const { exec } = require("../build");

test("exec output no flags", () => {
  exec("echo", "hello", { silent: true }).then(({ output }) => {
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
    expect(jsonOutput().ok).toBe(true);
  });
});

test("exec cwd", () => {
  exec("ls", ".", { cwd: "test", silent: true }).then(({ output }) => {
    expect(output.includes("exec.test.js")).toBe(true);
  });
});

test("exec jsonOutput", () => {
  exec("yarn", ["cloc", "source", "--json"], { silent: true }).then(({ jsonOutput }) => {
    expect(jsonOutput().header.cloc_url).toBe("github.com/AlDanial/cloc");
  });
});

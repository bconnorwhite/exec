const { exec } = require("../build");

test("exec output", () => {
  exec("echo", "hello", {}, { silent: true }).then(({ output }) => {
    expect(output).toBe("hello");
  });
});

test("exec jsonOutput", () => {
  exec("echo", JSON.stringify({ ok: true }), {}, { silent: true }).then(({ jsonOutput }) => {
    expect(jsonOutput().ok).toBe(true);
  });
});

test("exec cwd", () => {
  exec("ls", ".", {}, { cwd: "tests", silent: true }).then(({ output }) => {
    expect(output).toBe("exec-all.test.js\nexec-sync.test.js\nexec.test.js\nindex.test.js");
  });
});

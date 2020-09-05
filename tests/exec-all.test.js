const { execAll } = require("../build");

test("exec output", () => {
  execAll([{
    command: "echo",
    args: "hello"
  }, {
    command: "echo",
    args: JSON.stringify({ ok: true })
  }], {
    silent: true
  }).then((results) => {
    Promise.all(results).then((values) => {
      expect(values[0].output).toBe("hello");
      expect(values[1].jsonOutput().ok).toBe(true);
    });
  });
});

test("exec output parallel", () => {
  execAll([{
    command: "echo",
    args: "hello"
  }, {
    command: "echo",
    args: JSON.stringify({ ok: true })
  }], {
    parallel: true,
    silent: true
  }).then((results) => {
    Promise.all(results).then((values) => {
      expect(values[0].output).toBe("hello");
      expect(values[1].jsonOutput().ok).toBe(true);
    });
  });
});

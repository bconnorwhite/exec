import { execAll, execAllParallel, execAllSeries, execAllSync } from "../source";

test("execAll series", () => {
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
      expect(values[1].jsonOutput()).toEqual({ ok: true });
    });
  });
});

test("execAll parallel", () => {
  execAll([{
    command: "echo",
    args: "hello"
  }, {
    command: "echo",
    args: JSON.stringify({ ok: true })
  }], {
    silent: true,
    parallel: true
  }).then((results) => {
    Promise.all(results).then((values) => {
      expect(values[0].output).toBe("hello");
      expect(values[1].jsonOutput()).toEqual({ ok: true });
    });
  });
});

test("execAllSeries", () => {
  execAllSeries([{
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
      expect(values[1].jsonOutput()).toEqual({ ok: true });
    });
  });
});

test("execAllParallel", () => {
  execAllParallel([{
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
      expect(values[1].jsonOutput()).toEqual({ ok: true });
    });
  });
});

test("execAllSync", () => {
  const values = execAllSync([{
    command: "echo",
    args: "hello"
  }, {
    command: "echo",
    args: JSON.stringify({ ok: true })
  }], {
    silent: true
  });
  expect(values[0].output).toBe("hello");
  expect(values[1].jsonOutput()).toEqual({ ok: true });
});

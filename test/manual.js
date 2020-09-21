const { exec, execAll } = require("../build");

execAll([{
  command: "node",
  args: ["./test/interactive.js"],
  silent: false
}, {
  command: "node",
  args: ["./test/interactive.js"],
  silent: false
}], {
  parallel: false
}).then((results) => {
  console.log(results);
});

// exec("yarn", ["run", "cz"]).then((result) => {
//   console.log(result);
// });

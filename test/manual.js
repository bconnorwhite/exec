const { execAll } = require("../build");

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

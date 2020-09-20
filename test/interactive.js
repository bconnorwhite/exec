var inquirer = require('inquirer');

inquirer.prompt([{
  type: "confirm",
  name: "ok",
  message: "TEST"
}]).then((output) => {
  console.info(output);
});

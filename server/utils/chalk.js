const chalk = require("chalk");

const clog = {
  success: (data) => {
    console.log(chalk.white.bold.bgGreenBright(" success "), data);
  },
  error: (data) => {
    console.log(chalk.bold.bgRedBright(" error "),data);
  },
  warning: (data) => {
    console.log(chalk.bold.bgYellowBright(" warning "),data);
  },
  info: (data) => {
    console.log(chalk.bold.bgWhite(" Information "),data);
  },
};
module.exports = clog;

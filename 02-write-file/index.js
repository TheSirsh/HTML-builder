const fs = require('fs');
const path = require('path');
const textFile = fs.createWriteStream(path.join( __dirname, "text.txt"))
const { stdin, stdout } = require('process');
const os = require('os');
const exitText = 'exit';
const exitBtn = os.EOL;
const chalk = require('chalk');

stdin.on('data', textInput);
stdout.write(chalk.blue('\nInput your text:\n\n'));
process.on('SIGINT', textStop);

function textInput(data) {
  if (data.toString() == exitText + exitBtn) {
    textStop();
  } else {
    textFile.write(data);
  }
}

function textStop() {
  stdout.write(chalk.green('\nYour text is saved to a file text.txt\n\n'));
  process.exit();
}
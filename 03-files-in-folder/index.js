const fs = require('fs');
const path = require('path');
const secretFolder = path.join(__dirname, 'secret-folder');
const { stdout } = require('process');
const chalk = require('chalk');

fs.readdir(secretFolder, (err, files) => {
  stdout.write( '\n');

  files.forEach(file => {
    const stat = fs.statSync(`${path.join(secretFolder, file)}`)
    if (stat.isFile() === true) {
      const fileSeparator = file.indexOf('.');
      const fileName = file.slice(0, fileSeparator);
      const fileExtension = file.slice(fileSeparator + 1, file.length);
      const fileSize = Math.round(stat.size / 1.024) / 1000 + 'kb'
  
      stdout.write(chalk.blue(fileName) + ' - ' + (chalk.cyan(fileExtension) + ' - ' + (chalk.green(fileSize)) + '\n'));
      }
  });
  
  stdout.write( '\n')
});
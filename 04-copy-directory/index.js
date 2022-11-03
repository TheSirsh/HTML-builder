const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { stdout } = require('process');
const filesFolder = path.join(__dirname, 'files');
const filesFolderCopy = path.join(__dirname, 'files-copy');

copyDir();

function copyDir() {

  stdout.write( '\n');

  fs.open(filesFolderCopy, err => {
    if (err) {
      fs.mkdir(filesFolderCopy, err => {
        if (err) throw err;
      })
    }

    fs.readdir(filesFolderCopy, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(filesFolderCopy, file), err => {
          if (err) throw err;
        })
      }
    })

    fs.readdir(filesFolder, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
          fs.copyFile(path.join(filesFolder, file), path.join(filesFolderCopy, file), err => {
              if (err) throw err;
            })
        })
      })
  })

  stdout.write(chalk.blue('Your folder has been copied\n\n'));
}
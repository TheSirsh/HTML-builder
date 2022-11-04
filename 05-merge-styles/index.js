const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { stdout } = require('process');
const resultStylesFile = path.join(__dirname, 'project-dist', 'bundle.css');

bundleFiles();

function bundleFiles() {

  stdout.write( '\n');

  fs.readdir(path.join(__dirname, 'styles'), (err, files) => {

    if (err) throw err;

    files.forEach(file => {
      if (path.extname(file) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', file), (err, file) => {
            if (err) throw err;

            fs.open(resultStylesFile, 'w', err => {
                if (err) throw err;
              }
            )

            fs.appendFile(resultStylesFile, file, err => {
                if (err) throw err;
              })
          })
      }
    })
  })

  stdout.write(chalk.blue('Your css files are bundled\n\n'));
}
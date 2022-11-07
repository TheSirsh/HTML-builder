const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { stdout } = require('process');
const assetsFileFolder = path.resolve(__dirname, 'assets');
const stylesFileFolder = path.resolve(__dirname, 'styles');
const projectDistFolder = path.resolve(__dirname, 'project-dist');
const componentsFileFolder = path.resolve(__dirname, 'components');


fs.open(projectDistFolder, err => {
  if (err) { fs.mkdir(projectDistFolder, err => {
      if (err) throw err;
    })
  }
})

fs.rm(projectDistFolder, {recursive: true, force: true}, () => {
  fs.mkdir(projectDistFolder, { recursive: true }, (err) => {

    if (err) throw err;

    copyDir(assetsFileFolder, path.join(projectDistFolder, 'assets'));

    const style = fs.createWriteStream(path.join(projectDistFolder, 'style.css'));

    style.on('error', err => console.log(err));

    bundleFiles();

    const html = fs.createReadStream(path.join(__dirname, 'template.html'));
    let pattern = '';

    html.on('error', err => console.log(err));
    html.on('data', chunk => pattern += chunk);
    html.on('end', () => buildProject());

    stdout.write(chalk.blue('\nYour page is builded\n\n'));
  })
})

function copyDir(source, projectDistFolder) {

  fs.mkdir(projectDistFolder, err => {
    if (err) throw err;

    fs.readdir(source, {withFileTypes: true}, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.resolve(source, file.name), path.resolve(projectDistFolder, file.name), err => {
              if (err) throw err;
          })
        } else {
          copyDir(path.resolve(source, file.name), path.resolve(projectDistFolder, file.name))
        }
      })
    })
  })
}

function bundleFiles() {

  fs.readdir(path.join(stylesFileFolder), (err, files) => {
    if (err) throw err;

    files.forEach(file => {
      if (path.extname(file) === '.css') {
        fs.readFile(path.join(__dirname, 'styles', file), (err, file) => {
          if (err) throw err;

          fs.open(path.join(projectDistFolder, 'style.css'), 'w', err => {
            if (err) throw err;
          })

          fs.appendFile(path.join(projectDistFolder, 'style.css'), file, err => {
            if (err) throw err;
          })
        })
      }
    })
  })
}

function buildProject() {
  let html = fs.createReadStream(path.join(__dirname, 'template.html'));

  html.on('data', (chunk) => {
    let template = chunk.toString();
    fs.readdir(componentsFileFolder, (err, files) => {
      if (err) throw err;

      files.forEach(file => {
        let htmlFile = fs.createReadStream(path.join(componentsFileFolder, file));
        htmlFile.on('data', (chunk) => {
          template = template.replace(`{{${file.slice(0, file.length - 5)}}}`, chunk);
          fs.writeFile(path.join(projectDistFolder, 'index.html'), template, (err) => {
            if (err) throw err;
          })
        })
      })
    })
  })
}
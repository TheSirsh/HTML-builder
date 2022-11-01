const fs = require('fs');
const path = require('path');
const doc = path.join( __dirname, "text.txt");
const { stdout } = require('process');
const textStream = fs.createReadStream(doc)

textStream.on('readable', readFile)

function readFile() {
  let textFile = textStream.read();
  if(textFile != null) {
    stdout.write(textFile);
  }
}
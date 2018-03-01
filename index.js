'use strict';

const fs = require('fs');

let fileNames = [];
let resultNames = [];

let taskCode = 0;

let data = fs.readFileSync(fileNames[taskCode]).toString().split("\n");
for (let i = data.length - 1; i >= 0; i--) {
  data[i] = data[i].split(' ').map(parseFloat);
}



fs.writeFile(resultNames[taskCode], resultText, function(err) {
  if(err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
'use strict';

const fs = require('fs');

let fileNames = ['./a_example.in', './b_should_be_easy.in', './c_no_hurry.in', './d_metropolis.in', './e_high_bonus.in'];
let resultNames = ['./a_example.out', './b_should_be_easy.out', './c_no_hurry.out', './d_metropolis.out', './e_high_bonus.out'];

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
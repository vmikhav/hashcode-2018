'use strict';

function getDistance(a, b, x, y){
  return Math.abs(a-x) + Math.abs(b-y);
}

const fs = require('fs');

let fileNames = ['./a_example.in', './b_should_be_easy.in', './c_no_hurry.in', './d_metropolis.in', './e_high_bonus.in'];
let resultNames = ['./a_example.out', './b_should_be_easy.out', './c_no_hurry.out', './d_metropolis.out', './e_high_bonus.out'];

let taskCode = 0;

let data = fs.readFileSync(fileNames[taskCode]).toString().split("\n");
for (let i = data.length - 1; i >= 0; i--) {
  data[i] = data[i].split(' ').map(parseFloat);
}

let i, j, k, m, R = data[0][0], C = data[0][1], F = data[0][2], N = data[0][3], B = data[0][4], T = data[0][5];
let resultText = "";
/*
● R – number of rows of the grid
● C – number of columns of the grid
● F – number of vehicles in the fleet
● N – number of rides
● B – per-ride bonus for starting the ride on time
● T – number of steps in the simulation
*/

let riders = [], riders2 = [];

for (i = 1; i<=N; i++){
  if (data[i][0] + data[i][1] + getDistance(data[i][0], data[i][1], data[i][2], data[i][3]) >= data[i][5]){
    riders.push({num: i-1,a: data[i][0], b: data[i][1], x: data[i][2], y: data[i][3], s: data[i][4], f: data[i][5]});
    riders2.push(riders[i-1]);
  }
}



fs.writeFile(resultNames[taskCode], resultText, function(err) {
  if(err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
'use strict';

function getDistance(a, b, x, y){
  return Math.abs(a-x) + Math.abs(b-y);
}

function compareS(a, b) {
  return a.s - b.s;
}

function compareLen(a, b) {
  return b.len - a.len;
}

const fs = require('fs');

let fileNames = ['./a_example.in', './b_should_be_easy.in', './c_no_hurry.in', './d_metropolis.in', './e_high_bonus.in'];
let resultNames = ['./a_example.out', './b_should_be_easy.out', './c_no_hurry.out', './d_metropolis.out', './e_high_bonus.out'];

let taskCode = process.argv[2];

let data = fs.readFileSync(fileNames[taskCode]).toString().split("\n");
for (let i = data.length - 1; i >= 0; i--) {
  data[i] = data[i].split(' ').map(parseFloat);
}
//console.log(data);

let i, j, k, x, y, m, t, q, R = data[0][0], C = data[0][1], F = data[0][2], N = data[0][3], B = data[0][4], T = data[0][5];
let resultText = "";
/*
● R – number of rows of the grid
● C – number of columns of the grid
● F – number of vehicles in the fleet
● N – number of rides
● B – per-ride bonus for starting the ride on time
● T – number of steps in the simulation
*/

console.log(N);
let riders = [], riders2 = [], riders3 = [];

for (i = 1; i<=N; i++){
  if (data[i][0] + data[i][1] + getDistance(data[i][0], data[i][1], data[i][2], data[i][3]) <= data[i][5]){
    riders.push({num: i-1, a: data[i][0], b: data[i][1], x: data[i][2], y: data[i][3], s: data[i][4], f: data[i][5], served: 0, len: getDistance(data[i][0], data[i][1], data[i][2], data[i][3])});
    riders2.push(riders[i-1]);
    //riders3.push({num: i-1, a: data[i][0], b: data[i][1], x: data[i][2], y: data[i][3], s: data[i][4], f: data[i][5], served: 0, len: getDistance(data[i][0], data[i][1], data[i][2], data[i][3])});
  }
}

riders.sort(compareS);

function getOptVariants(t, x, y){
  let j, q, variants = [];
  for (j = 0; j< riders.length; j++){
    //console.log(j, riders[j]);
    k = getDistance(x, y, riders[j].a, riders[j].b);
    if (riders[j].served == 0 && riders[j].f >= t + k + riders[j].len){
      q = {s: 0, t: 0, num: j};
      if (t + k <= riders[j].s){
        q.s += B;
        q.t += riders[j].s - (t + k);
      }
      q.s += riders[j].len;
      q.t += k + riders[j].len;
      q.s = q.s / q.t;
      //console.log(q);
      variants.push(q);
    }
    if (variants.length > 200){
      break;
    }
  }
  variants.sort(compareS);
  if (variants.length){
    return variants[variants.length - 1];
  }
  else{
    return {s: 0, t: 0};
  }
}

let vehicles = [];
let variants = [];
let lastId = -1;

for (i = 0; i < F; i++){
  vehicles.push([]);
  t = 0; lastId = -1;
  x = 0; y = 0;
  while (t < T){
    variants = [];
    for (j = 0; j< riders.length; j++){
      //console.log(j, riders[j]);
      k = getDistance(x, y, riders[j].a, riders[j].b);
      if (riders[j].served == 0 && riders[j].f >= t + k + riders[j].len){
        q = {s: 0, t: 0, num: j};
        if (t + k <= riders[j].s){
          q.s += B;
          q.t += riders[j].s - (t + k);
        }
        q.s += riders[j].len;
        q.t += k + riders[j].len;
        q.s = q.s / q.t;

        m = getOptVariants(t + q.t, riders[q.num].x, riders[q.num].y);
        q.s += m.s;
        //console.log(q);
        variants.push(q);
      }
      /*if (variants.length > 200){
        break;
      }*/
    }
    //console.log(i, t, variants);
    if (variants.length){
      variants.sort(compareS);
      q = variants[variants.length - 1];

      t += q.t;
      x = riders[q.num].x;
      y = riders[q.num].y;
      riders[q.num].served = 1;
      vehicles[i].push(riders[q.num].num);
    }
    else{
      break;
    }
  }
}

//console.log(' - - - ');

for (i = 0; i < F; i++){
  //console.log(vehicles[i]);
  if (vehicles[i].length){
    resultText += (vehicles[i].length) + " " + vehicles[i].join(' ') + '\n';
  }
  else{
    resultText += "0\n"; 
  }
}

fs.writeFile(resultNames[taskCode], resultText, function(err) {
  if(err) {
    return console.log(err);
  }

  console.log("The file was saved!");
});
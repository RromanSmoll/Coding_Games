/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const n = parseInt(readline()); // the number of temperatures to analyse
var inputs = readline().split(" ");
for (let i = 0; i < n; i++) {
  const t = parseInt(inputs[i]); // a temperature expressed as an integer ranging from -273 to 5526
}

// Write an answer using console.log()
// check if the test case is 0
const checking = (n) => {
  return n == 0 ? "0" : n < 0 ? "error entering positive number" : n;
};
//main
try {
  let checked = checking(n);
  if (!parseInt(checked)) {
    console.log(checked);
  } else {
    const goal = 0;
    console.error(inputs);
    var closest = inputs.reduce(function (prev, curr) {
      return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
    });
    console.error(`closest is : ${closest},${Math.abs(closest)}`);
    //check if there is closest but positive:
    if (inputs.includes(`${Math.abs(closest)}`)) {
      console.log(Math.abs(closest));
    } else {
      console.error(`here`);
      console.log(closest);
    }
  }
} catch (e) {
  console.debug(e);
}

// To debug: console.error('Debug messages...');

//console.log('result');

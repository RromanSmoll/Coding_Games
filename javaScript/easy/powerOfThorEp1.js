/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 * ---
 * Hint: You can use the debug stream to print initialTX and initialTY, if Thor seems not follow your orders.
 **/

var inputs = readline().split(" ");
const lightX = parseInt(inputs[0]); // the X position of the light of power
const lightY = parseInt(inputs[1]); // the Y position of the light of power
var initialTx = parseInt(inputs[2]); // Thor's starting X position
var initialTy = parseInt(inputs[3]); // Thor's starting Y position

const directions = {
  N: 0 - 1,
  NE: (1, -1),
  E: (1, 0),
  SE: (1, 1),
  S: (0, 1),
  SW: (-1, 1),
  W: (-1, 0),
  NW: (-1, -1),
};
// game loop
while (true) {
  const remainingTurns = parseInt(readline()); // The remaining amount of turns Thor can move. Do not remove this line.
  let ir = ["", ""];
  let directionx = lightX - initialTx;
  let directiony = lightY - initialTy;
  switch (true) {
    case directionx > 0:
      ir[1] = "E";
      initialTx = initialTx + 1;
      break;
    case directionx == 0:
      break;
    case directionx < 0:
      ir[1] = "W";
      initialTx = initialTx - 1;
      break;
  }
  switch (true) {
    case directiony > 0:
      ir[0] = "S";
      initialTy = initialTy + 1;
      break;
    case directiony == 0:
      break;
    case directiony < 0:
      ir[0] = "N";
      initialTy = initialTy - 1;
      break;
  }
  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  // A single line providing the move to be made: N NE E SE S SW W or NW
  console.log(ir.join(""));
}

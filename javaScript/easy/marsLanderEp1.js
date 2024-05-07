/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const surfaceN = parseInt(readline()); // the number of points used to draw the surface of Mars.
let surface = [];
for (let i = 0; i < surfaceN; i++) {
  var inputs = readline().split(" ");
  const landX = parseInt(inputs[0]); // X coordinate of a surface point. (0 to 6999)
  const landY = parseInt(inputs[1]); // Y coordinate of a surface point. By linking all the points together in a sequential fashion, you form the surface of Mars.
  surface.push({ x: landX, y: landY });
}
console.error(surface);
// game loop
while (true) {
  var inputs = readline().split(" ");
  const X = parseInt(inputs[0]);
  const Y = parseInt(inputs[1]);
  const hSpeed = parseInt(inputs[2]); // the horizontal speed (in m/s), can be negative.
  const vSpeed = parseInt(inputs[3]); // the vertical speed (in m/s), can be negative.
  const fuel = parseInt(inputs[4]); // the quantity of remaining fuel in liters.
  const rotate = parseInt(inputs[5]); // the rotation angle in degrees (-90 to 90).
  const power = parseInt(inputs[6]); // the thrust power (0 to 4).

  // Write an action using console.log()
  // To debug: console.error('Debug messages...');

  const landing0 = surface.indexOf(
    surface.find((element, index) => element.y === surface[index + 1].y)
  );
  const landingSpace = { start: surface[landing0], end: surface[landing0 + 1] };
  const landingH = surface[landing0].y;
  if (Y - landingH >= 1500) {
    //const distToSurface = landY-Y
    // 2 integers: rotate power. rotate is the desired rotation angle (should be 0 for level 1), power is the desired thrust power (0 to 4).
    console.log("0 3");
  } else {
    console.log("0 4");
  }
}

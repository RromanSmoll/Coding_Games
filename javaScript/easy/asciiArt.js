/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const L = parseInt(readline());
const H = parseInt(readline());
const T = readline().toUpperCase().split("");
let x = [];
//console.error(x)
let mat = [];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
for (let i = 0; i < H; i++) {
  const ROW = readline();
  mat.push(ROW);
}
//console.error(mat);
for (let i = 0; i < T.length; i++) {
  const c = T[i];
  if (c !== " ") {
    var b = alphabet.indexOf(c.toUpperCase());
    //console.error(b)
    c === 0 ? x.push([0, L - 1]) : x.push([b * L, b * L + L]);
    //console.error(x)
  } else if (c === " ") {
    x.push([-1, -1]);
  } else {
    x.push([-2, -2]);
  }
}
for (let z = 0; z < H; z++) {
  let line = mat[z];
  let lineAns = [];
  x.forEach((cc) => {
    //console.error(cc[0])
    if (cc[0] >= 0) {
      lineAns.push(line.substring(cc[0], cc[1]));
    } else if (cc[0] < 0) {
      //console.error('#'.repeat(L-1)).concat(' ')
      lineAns.push(
        line.substring(alphabet.length * L, alphabet.length * L + L)
      );
    }
  });
  console.log(lineAns.join("").concat(""));
}
// Write an answer using console.log()
// To debug: console.error('Debug messages...');

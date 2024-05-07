/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const N = parseInt(readline()); // Number of elements which make up the association table.
const Q = parseInt(readline()); // Number Q of file names to be analyzed.
let typeArray = [];
for (let i = 0; i < N; i++) {
  var inputs = readline().split(" ");
  const EXT = inputs[0]; // file extension
  const MT = inputs[1]; // MIME type.
  console.error(`[${i}]EXT : ${EXT}, MT : ${MT} `);
  typeArray.push({ id: EXT.toLowerCase(), MT: MT });
}

for (let i = 0; i < Q; i++) {
  //console.error(`iteration [${i}]`)
  const FNAME = readline(); // One file name per line.
  console.error(`[${i}] FName: ${FNAME}`);
  if (FNAME.includes(".")) {
    const c = FNAME.split(".").pop().toLowerCase();
    console.error(`c - ${c}`);
    console.log(
      typeArray.find((a) => a.id === c) !== undefined
        ? typeArray.find((a) => a.id === c).MT
        : "UNKNOWN"
    );
  } else {
    console.log(`UNKNOWN`);
  }
  console.error(`\n`);
}

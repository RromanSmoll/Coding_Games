/**
2
3
A __---___---___---___---___
B ____---___---___---___---_
C AND A B
D OR A B
E XOR A B

Found
Expected:
C ____-_____-_____-_____-___
D __-----_-----_-----_-----_
E __--_--_--_--_--_--_--_--_
 **/
class Operations {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  and(a, b) {
    if (a === "-" && b === "-") {
      return "-";
    }
    return "_";
  }
  or(a, b) {
    if (a === "-" || b === "-") {
      return "-";
    }
    return "_";
  }
  xor(a, b) {
    if (a === b) {
      return "_";
    }
    return "-";
  }
  nand(a, b) {
    if (a === b && a === "-") {
      return "_";
    }
    return "-";
  }
  nor(a, b) {
    if (a === b && a === "_") {
      return "-";
    }
    return "_";
  }
  nxor(a, b) {
    if (a !== b) {
      return "_";
    }
    return "-";
  }
}
const n = parseInt(readline()); //
const m = parseInt(readline()); //
let inp = [];
let outp = [];
for (let i = 0; i < n; i++) {
  var inputs = readline().split(" ");
  const inputName = inputs[0];
  const inputSignal = inputs[1];
  console.error(`input : ${inputs} `);
  inp[inputName] = { inputSignal };
}
for (let i = 0; i < m; i++) {
  var inputs = readline().split(" ");
  const outputName = inputs[0]; //response in the beginning of teh case
  const type = inputs[1]; //logic operation
  const inputName1 = inputs[2]; //1st to process
  const inputName2 = inputs[3]; //2nd to process
  console.error(`output : ${inputs} `);
  outp[outputName] = {
    operation: type,
    compare: inputName1,
    compareTo: inputName2,
  };
}
console.error(outp);
for (const [key, values] of Object.entries(outp)) {
  console.error(key);
  let ans = `${key} `;
  console.error(`key : ${ans}`);
  for (
    let ii = 0;
    ii < inp[values.compare].inputSignal.split("").length;
    ii++
  ) {
    const Op = new Operations(
      inp[values.compare].inputSignal.split("")[ii],
      inp[values.compareTo].inputSignal.split("")[ii]
    );

    switch (values.operation) {
      case "AND":
        ans =
          ans +
          Op.and(
            inp[values.compare].inputSignal.split("")[ii],
            inp[values.compareTo].inputSignal.split("")[ii]
          );
        break;
      case "OR":
        ans =
          ans +
          Op.or(
            inp[values.compare].inputSignal.split("")[ii],
            inp[values.compareTo].inputSignal.split("")[ii]
          );
        break;
      case "XOR":
        ans =
          ans +
          Op.xor(
            inp[values.compare].inputSignal.split("")[ii],
            inp[values.compareTo].inputSignal.split("")[ii]
          );
        break;
      case "NAND":
        ans =
          ans +
          Op.nand(
            inp[values.compare].inputSignal.split("")[ii],
            inp[values.compareTo].inputSignal.split("")[ii]
          );
        break;
      case "NOR":
        ans =
          ans +
          Op.nor(
            inp[values.compare].inputSignal.split("")[ii],
            inp[values.compareTo].inputSignal.split("")[ii]
          );
        break;
      case "NXOR":
        ans =
          ans +
          Op.nxor(
            inp[values.compare].inputSignal.split("")[ii],
            inp[values.compareTo].inputSignal.split("")[ii]
          );
        break;
      default:
        console.error(`Unknon logic`);
        break;
    }
  }
  console.log(ans);
}

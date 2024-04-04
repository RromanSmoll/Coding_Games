const fs = require("fs");
let p1 = [
  { v: 10, n: "10" },
  { v: 13, n: "K" },
  { v: 6, n: "6" },
  { v: 10, n: "10" },
  { v: 8, n: "8" },
  { v: 14, n: "A" },
  { v: 12, n: "Q" },
  { v: 3, n: "3" },
  { v: 7, n: "7" },
  { v: 13, n: "K" },
  { v: 9, n: "9" },
  { v: 2, n: "2" },
  { v: 11, n: "J" },
  { v: 13, n: "K" },
  { v: 3, n: "3" },
  { v: 2, n: "2" },
  { v: 12, n: "Q" },
  { v: 14, n: "A" },
  { v: 11, n: "J" },
  { v: 7, n: "7" },
  { v: 13, n: "K" },
  { v: 10, n: "10" },
  { v: 4, n: "4" },
  { v: 14, n: "A" },
  { v: 5, n: "5" },
  { v: 5, n: "5" },
];
let p2 = [
  { v: 2, n: "2" },
  { v: 9, n: "9" },
  { v: 8, n: "8" },
  { v: 4, n: "4" },
  { v: 5, n: "5" },
  { v: 14, n: "A" },
  { v: 11, n: "J" },
  { v: 12, n: "Q" },
  { v: 7, n: "7" },
  { v: 5, n: "5" },
  { v: 4, n: "4" },
  { v: 6, n: "6" },
  { v: 6, n: "6" },
  { v: 12, n: "Q" },
  { v: 9, n: "9" },
  { v: 10, n: "10" },
  { v: 4, n: "4" },
  { v: 11, n: "J" },
  { v: 6, n: "6" },
  { v: 3, n: "3" },
  { v: 8, n: "8" },
  { v: 3, n: "3" },
  { v: 7, n: "7" },
  { v: 9, n: "9" },
  { v: 8, n: "8" },
  { v: 2, n: "2" },
];
function logthis(a1, a2) {
  const x = Math.max(a1.length, a2.length);
  for (let i = 0; i < x; i++) {
    fs.appendFileSync(
      ".../../logs/warLog.txt",
      `${a1[i] !== undefined ? JSON.stringify(a1[i]) : "empty"} | ${
        a2[i] !== undefined ? JSON.stringify(a2[i]) : "empty"
      } \n`
    );
  }
}
function erasee(a, n) {
  for (let i = 0; i < n; i++) {
    a.shift();
  }
}
//function to erase conditions;
function war(pp1, pp2, recursionCounter = 1) {
  let rCounter = recursionCounter;
  //check if the war is possible
  if (pp1.length < 4 || pp2.length < 4) {
    return "PAT";
  }
  //war is possible
  //take the 4th card, compare
  let comp1 = pp1[rCounter * 4 - 1];
  let comp2 = pp2[rCounter * 4 - 1];
  fs.appendFileSync(
    `.../../logs/warLog.txt`,
    `selected battle values ${JSON.stringify(comp1)} and ${JSON.stringify(
      comp2
    )}} \n`
  );
  //if same
  if (comp1.v === comp2.v) {
    rCounter++;
    return war(pp1, pp2, rCounter);
  } else {
    fs.appendFileSync(
      ".../../logs/warLog.txt",
      `war winner :${
        pp1[rCounter * 4 - 1].v > pp2[rCounter * 4 - 1].v ? 1 : 2
      } with counter of consequuity ${rCounter}`
    );
    return {
      winner: pp1[rCounter * 4 - 1].v > pp2[rCounter * 4 - 1].v ? 1 : 2,
      times: rCounter,
    };
  }
}
///Game
//Players put the cards:
let specialCase;
let counter = 0;

while (p1.length > 0 && p2.length > 0) {
  let cp1 = p1[0];
  p1.shift();
  let cp2 = p2[0];
  p2.shift();
  fs.appendFileSync(
    ".../../logs/warLog.txt",
    `comparing ${cp1.v} / ${cp2.v}` + "\n"
  );
  if (cp1.v === undefined || cp2.v === undefined) {
    break;
  }
  //case where one is bigger than other
  if (cp1.v !== cp2.v) {
    if (cp1.v > cp2.v) {
      p1.push(cp1);
      p1.push(cp2);
    } else {
      p2.push(cp1);
      p2.push(cp2);
    }
    fs.appendFileSync(
      ".../../logs/warLog.txt",
      `current step: ${counter}` + "\n"
    );
  } else {
    //War
    let warRes = war(p1, p2);
    if (typeof warRes === "string") {
      specialCase = "PAT";
      break;
    } else {
      let temp1 = p1.slice(0, warRes.times * 4);
      let temp2 = p2.slice(0, warRes.times * 4);
      let winPot = [cp1].concat(temp1).concat([cp2]).concat(temp2);
      parseInt(warRes.winner) === 1
        ? (p1 = p1.concat(winPot))
        : (p2 = p2.concat(winPot));
      erasee(p1, warRes.times * 4);
      erasee(p2, warRes.times * 4);
      fs.appendFileSync(
        ".../../logs/warLog.txt",
        `current war end step: ${counter} \n`
      );
    }
  }
  counter++;
  logthis(p1, p2);
}

console.log(
  specialCase !== undefined
    ? specialCase
    : `${p1.length > 0 ? 1 : 2} ${counter}`
);

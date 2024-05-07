/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const MESSAGE = readline();

function text2Binary(string) {
  return string
    .split("")
    .map(function (char) {
      return char.charCodeAt(0).toString(2).padStart(7, "0");
    })
    .join("");
}

let final;

function encode(letterBitAarray, ind, fstr) {
  let finalString = fstr.length == 0 ? "" : fstr;
  let id1 = "0";
  let id0 = "00";
  let index = ind == 0 ? 0 : ind;
  console.error(`index : ${index}\r\nfinalString ${finalString}`);
  let counter = 0;
  let bitsfirst = letterBitAarray[index];
  if (letterBitAarray[index + 1] === bitsfirst) {
    do {
      console.error(
        `checking index ${index + 1}:${
          letterBitAarray[index + 1]
        } against index - ${index} : ${letterBitAarray[index]}`
      );
      index++;
      counter++;
    } while (letterBitAarray[index + 1] === bitsfirst);
    counter++;
  } else {
    counter++;
  }
  console.error(`index increased ${counter} times`);
  //assemble line :
  const part =
    bitsfirst == 0
      ? `${id0} ${"0".repeat(counter)} `
      : `${id1} ${"0".repeat(counter)} `;
  console.error(`part - ${part}`);
  finalString = finalString.concat(`${part}`);
  index++;
  console.error(`finalString so far - ${finalString}`);
  if (index <= letterBitAarray.length - 1) {
    console.error(`***********************************`);
    encode(letterBitAarray, index, finalString);
  } else {
    console.error(`finished.returning ${finalString}`);
    final = finalString.substr(0, finalString.length - 1);
  }
  console.error(`final: ${final}`);
  return final;
}

try {
  if (MESSAGE) {
    console.error(`MESSAGE IS : ${MESSAGE}`);

    const letters = text2Binary(MESSAGE); //MESSAGE.split("");
    console.error(`letters :${letters}`);

    const result = encode(letters.split(""), 0, "");
    /* console.error(typeof(result))
    console.log(result.replace(/.$/, '')) */
    console.log(result);
  } else {
    throw new Error(`no message inserted`);
  }
} catch (e) {
  console.error(`e:${e}`);
}

// Write an answer using console.log()
// To debug: console.error('Debug messages...');

//console.log('answer');

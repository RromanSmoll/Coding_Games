/**
Input
10
'users'=(('id'=10;
'name'='Serge';
'roles'=('visitor';
'moderator'
));
('id'=11;
'name'='Biales'
);
true
)
Output
'users'=
(
    (
        'id'=10;
        'name'='Serge';
        'roles'=
        (
            'visitor';
            'moderator'
        )
    );
    (
        'id'=11;
        'name'='Biales'
    );
    true
)
 
 
Input
9
( 'user'= (
    'key'='1= t(c)(';
    'valid'=false
  );
  'user'= (
    'key'=' = ; ';
    'valid'= true
  ); ()
​)
Output
(
    'user'=
    (
        'key'='1= t(c)(';
        'valid'=false
    );
    'user'=
    (
        'key'=' = ; ';
        'valid'=true
    );
    (
    ​)
​)
 */

let temp_string = "";
let tabs = 0;
let string_started = false;
let last_char = "";

function check_next_line(c, last_char) {
  if (last_char === "=") {
    console.error(c.charCodeAt(0));
  }
  if (last_char === ")" && c !== ";" && c !== ")" && c !== "(") {
    temp_string += "\n" + " ".repeat(tabs * 4);
  } else if (last_char === "(" && c !== ")") {
    temp_string += "\n" + " ".repeat(tabs * 4);
  } else if (last_char === ";") {
    temp_string += "\n" + " ".repeat(tabs * 4);
  } else if (last_char === "=" && c === "(") {
    temp_string += "\n" + " ".repeat(tabs * 4);
  }
}

let inputs = [];
const N = parseInt(readline());
for (let i = 0; i < N; i++) {
  let x = readline(); //.trimStart();//.replace(/^\t+|^\s+/,'');
  if (x !== null) {
    inputs.push(x.trimStart());
  }
  /* let x=readline();
       let xx=x.trimStart().replace(/^\t+/ | /^\s+/, '');
       console.error(x)
       console.error(xx) 
          inputs.push(xx)
   }*/
}

for (const line of inputs) {
  for (const c of line) {
    if (c === "'" && !string_started) {
      check_next_line(c, last_char);
      string_started = true;
      temp_string += c;
    } else if (string_started && c === "'") {
      string_started = false;
      temp_string += c;
    } else if (string_started) {
      temp_string += c;
    } else if (c === " ") {
      continue;
    } else {
      check_next_line(c, last_char);
      if (c === "(") {
        temp_string += "(";
        tabs += 1;
      } else if (c === ")") {
        tabs -= 1;
        temp_string += "\n" + " ".repeat(tabs * 4) + ")";
      } else {
        temp_string += c;
      }
    }
    last_char = c;
  }
}
var z = temp_string.split("\n");
console.error(temp_string);
for (const f of z) {
  /*   switch (f.charAt(0)){
        case '(':
            console.log(f)
            break;
        case ')':
            console.log(f)
            break;
        case "'":
            console.log(f)
            break;
        case " ":
            console.log(f.trimStart())
            break;
        default:
            console.log(f.trimStart())
    } */
  if (f.indexOf("'") === -1 && f.indexOf("(") === -1 && f.indexOf(")") === -1) {
    //console.log(f.replace(/\t/g,''))
    var t = f.indexOf((c) => c != " " && c != "\t");
    console.log(
      f
        .substring(0, t)
        .replace(/\t/g, "")
        .concat(f.substring(t))
        .replace(/\t/g, "")
    );
  } else {
    console.log(f);
  }
}

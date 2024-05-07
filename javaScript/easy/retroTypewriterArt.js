const abs = {
  sp: " ",
  bS: `\\`,
  sQ: "'",
  nl: "\n",
};
const T = readline().split("nl");

for (const t of T) {
  let result = "";
  const Z = t.trim().split(" ");
  // console.error(Z)
  for (const z of Z) {
    //if the combination is an occurence of special signs:
    if (!/^\d+$/.test(z)) {
      var cl = z.length - 1;
      while ((z.charCodeAt(cl) > 57 || z.charCodeAt(cl) < 48) && cl >= 0) {
        cl = cl - 1;
      }
      switch (z.length - 1 - cl) {
        case 2:
          var x = z.substring(cl + 1);
          result =
            result + `${abs[x]}`.repeat(parseInt(z.substring(0, cl + 1)));
          break;
        case 1:
          result =
            result +
            z.substring(cl + 1).repeat(parseInt(z.substring(0, cl + 1)));
          break;
      }
    }
    //if combination is an occurence of numbers
    else {
      result =
        result +
        z
          .substring(z.length - 1)
          .repeat(parseInt(z.substring(0, z.length - 1)));
    }
  }
  console.log(result);
}

//BEST SOLUTION
/* function execute(number,signe=''){
    if(signe =="nl"){
        return '\n';
    }

    const mapping = {
        bS:'\\',
        sp:' ',
        sQ:"'"
    }

    return (mapping[signe] ?? signe).repeat(number) // if mapping exist, return it, else return the signe
}

const T = readline();

print(T.split(" ")
    .map(
        x => (parseInt(x)==x) // if it's a number
            ? execute([...x].slice(0,-1).join(''),[...x].slice(-1).join('')) 
*/
//            : execute(x.match(/([0-9])*/)[0] ,x.match(/([^0-9])*$/)[0])
/*
    )
    .join('')
); */

/**
 * 6 Degrees of Kevin Bacon!
 * 
Elvis Presley
3
Change of Habit: Elvis Presley, Mary Tyler Moore, Barbara McNair, Jane Elliot, Ed Asner
JFK: Kevin Costner, Kevin Bacon, Tommy Lee Jones, Laurie Metcalf, Gary Oldman, Ed Asner
Sleepers: Kevin Bacon, Jason Patric, Brad Pitt, Robert De Niro, Dustin Hoffman
 **/
/**
 * 6 Degrees of Kevin Bacon!
 **/
//Nodes
var id = 0;
class Node {
  constructor(name, kevin) {
    this.id = id++;
    this.name = name;
    this.links = [];
    this.isKevin = kevin;
  }
  addLink(nodeName, nodeIndex) {
    //nodeId
    if (this.links.indexOf(nodeName) === -1) {
      this.links.push(nodeName);
    }
  }
  removeLink(nodeName) {
    //nodeId
    var index = this.links.indexOf(nodeID);
    if (index > -1) {
      this.links.splice(index, 1);
    }
  }
}

//Functionality support
function containsObject(name, list) {
  for (let i = 0; i < list.length; i++) {
    const [k] = Object.entries(list[i]);
    //console.error(k)
    if (k[0] === name) {
      return k[1];
    }
  }
  return -1;
}

//Game entry
const actorName = readline();
const n = parseInt(readline());
let casts = [];
let nodes;
let names = [];
for (let i = 0; i < n; i++) {
  const movieCast = readline().split(":")[1].split(",");
  casts.push(movieCast);
  movieCast.forEach((actor) => names.push(actor));
}

//create all unique nodes
nodes = [...new Set(names)].map((name) => {
  return new Node(name, name === " Kevin Bacon" ? true : false);
});
//Populate the unique nodes
for (const cast of casts) {
  for (const name of cast) {
    const nameIndex = cast.indexOf(name);
    console.error(nameIndex);
    const linkedTo = [
      ...new Set([
        ...cast.slice(0, nameIndex),
        ...cast.slice(nameIndex + 1, cast.length - 1),
      ]),
    ];
    console.error(`${name} : links :${linkedTo}`);
    //in Nodes, get index of current actor
    const baseactorNodeIndex = nodes
      .map(function (a) {
        return a.name;
      })
      .indexOf(name);
    linkedTo.forEach((a) => {
      let actorNodeIndex = nodes
        .map(function (a) {
          return a.name;
        })
        .indexOf(a);
      nodes[baseactorNodeIndex].addLink(a, actorNodeIndex);
      nodes[actorNodeIndex].addLink(name, baseactorNodeIndex);
    });
  }
}
console.error(nodes);

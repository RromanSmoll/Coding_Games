/**
 * Example
Targt -> Elvis Presley
3
Change of Habit: Elvis Presley, Mary Tyler Moore, Barbara McNair, Jane Elliot, Ed Asner
JFK: Kevin Costner, Kevin Bacon, Tommy Lee Jones, Laurie Metcalf, Gary Oldman, Ed Asner
Sleepers: Kevin Bacon, Jason Patric, Brad Pitt, Robert De Niro, Dustin Hoffman
 **/

/**
 * 6 Degrees of Kevin Bacon!
 **/

//Nodes
//var id=0;
class Node {
  constructor(name, kevin) {
    //this.id=id++;
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

//Game entry
const target = readline();
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
//searching the index of the node of a particular actor;
function findNodeIndex(name) {
  return nodes
    .map(function (a) {
      return a.name;
    })
    .indexOf(name);
}

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
    const baseactorNodeIndex = findNodeIndex(name);
    linkedTo.forEach((a) => {
      let actorNodeIndex = findNodeIndex(a);
      nodes[baseactorNodeIndex].addLink(a, actorNodeIndex);
      nodes[actorNodeIndex].addLink(name, baseactorNodeIndex);
    });
  }
}
console.error(nodes);

/**
 * Traversal
 */
let pathDistance = 0;
let traversedNodes = [];
function traverse(queue) {
  //queue is an array of names
  return new Promise(function (resolve, reject) {
    if (queue.length !== 0) {
      let totalLinks = [];
      for (const a of queue) {
        const indexOfThisNode = findNodeIndex(a);
        if (traversedNodes.indexOf(indexOfThisNode) == -1) {
          traversedNodes.push(indexOfThisNode);
          const currentLinks = nodes[indexOfThisNode].links;
          totalLinks.push(...currentLinks);
        }
      }
      if (totalLinks.indexOf(" Kevin Bacon") !== -1) {
        resolve(`found Kevin at ${pathDistance}`);
      } else {
        //delete then every queue idem from nodes to avoid loops and increment the value;
        pathDistance++;
        resolve(traverse(totalLinks));
      }
    }
  });
}
if (target === "Kevin Bacon") {
  console.log(pathDistance);
} else {
  pathDistance++;
  console.error(`starting with : ${target}`);
  traverse([` ${target}`]).then((result) => {
    console.error(result);
    console.log(pathDistance);
  });
}

/**
 *
 * Best solution after submission:
const target = "Kevin Bacon";
const actorName = readline();
const n = parseInt(readline());
const nodes = {};
for (let i = 0; i < n; i++) {
    let [movie, actors] = readline().split(": ");
    actors = actors.split(", ");
    for (const a of actors) {
        if (!(a in nodes)) {
            nodes[a] = [];
        }
        nodes[a].push(...actors.filter(n => n !== a));
    }
}

function degrees(list, visited = {}, n=0) {
    const nextList = [];
    for (x of list) {
        if (x === target) return n;
        visited[x] = true;
        for (y of nodes[x]) {    
            if (!visited[y]) {
                visited[y] = true;
                nextList.push(y);
            }
        }
    }
    return degrees(nextList, visited, n + 1);
}

console.log(degrees([actorName]));
 *
 */

/**
 * 
 * Alternative revision
const actors = {unknown : []};
const actorName = readline();
const n = parseInt(readline());
for (let i = 0; i < n; i++) {
    let [movieName, movieCast] = readline().split(': ');
    for(let actor of movieCast.split(', ')) {
        if(!actors[actor]) actors[actor] = [];
        actors[actor].push(...movieCast.split(', ').filter(a => a !== actor));
    }
}

var count = Infinity;
lookForKevin()
console.log(actorName === 'Kevin Bacon' ? 0 : count + 1)

function lookForKevin(actor = actorName, separation = 0, seen = []) {
    if(separation > count) return;
    if(actors[actor].includes('Kevin Bacon')) count = Math.min(separation, count);
    actors[actor].forEach(a => {
        if(!seen.includes(a)) lookForKevin(a, separation + 1, seen.concat(a))
    })
}
 * 
 */

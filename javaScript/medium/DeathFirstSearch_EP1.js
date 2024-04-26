let example = [
  [0, 1, 0],
  [1, 0, 1],
  [0, 1, 0],
];

var inputs = readline().split(" ");
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links / edges
const E = parseInt(inputs[2]); // the number of exit gateways
console.error(
  `ENTRY:\r\nTotal nodes: ${N}\r\nLinks: ${L}\r\nExit gateaways: ${E}`
);

//creation of adjecency list //see Example upstairs as a reference
let adjList = Array.apply(null, Array(N)).map(function () {
  return Array.apply(null, Array(N)).map(function () {
    return 0;
  });
});

//fill the 1-s and 0-s
for (let i = 0; i < L; i++) {
  var inputs = readline().split(" ");
  const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
  const N2 = parseInt(inputs[1]);
  console.error(`Link ${i}: ${N1} - ${N2}`);
  adjList[N1][N2] = 1;
  adjList[N2][N1] = 1;
}
console.error(adjList);
var gateways = [];
for (let i = 0; i < E; i++) {
  const EI = parseInt(readline()); // the index of a gateway node
  console.error(`Gataway index ${i}: ${EI}`);
  gateways.push(EI);
}

/**
 * BFS
 * will be applied for every exit gateway
 */
function bfs(graph, currentAgent) {
  var nodesLen = {};

  for (let i = 0; i < graph.length; i++) {
    nodesLen[i] = Infinity;
  }
  nodesLen[currentAgent] = 0;

  var queue = [currentAgent];
  var current;

  while (queue.length != 0) {
    current = queue.shift();
    var currConnected = graph[current];
    var neighbourIdx = [];
    var idx = currConnected.indexOf(1);

    //find all nodes connected to the current node
    while (idx != -1) {
      neighbourIdx.push(idx);
      idx = currConnected.indexOf(1, idx + 1); //and the next node after that (+1)
    }
    //loop throguth the found nodes
    for (let j = 0; j < neighbourIdx.length; j++) {
      if (nodesLen[neighbourIdx[j]] == Infinity) {
        nodesLen[neighbourIdx[j]] = nodesLen[current] + 1;
        queue.push(neighbourIdx[j]);
      }
    }
  }
  return nodesLen;
}

// game loop
while (true) {
  const SI = parseInt(readline()); // The index of the node on which the Bobnet agent is positioned this turn
  console.error(`Bobnet is positioned at ${SI}`);
  //calculate distances for every node, Then select only gatays;
  const distances = [];
  for (const [key, value] of Object.entries(bfs(adjList, SI))) {
    distances.push({ key: key, value: value });
  }
  distances.sort((a, b) => a.value - b.value);
  console.error(`bfs: ${JSON.stringify(distances)}`);

  //very close ssumption. If bobnet is positioned at 1 node close to any gateaway -> shut it down
  var nodeClose = false;
  for (const n of distances) {
    if (gateways.find((g) => n.key == g) !== undefined) {
      if (adjList[SI][n.key] === 1) {
        console.log(`${SI} ${n.key}`);
        nodeClose = true;
      }
    }
  }
  if (!nodeClose) {
    var currentAgentConnections = adjList[SI];
    console.log(`${SI} ${currentAgentConnections.indexOf(1)}`);
  }
}

/**
 *
 *
 * Solution 2.
 * Simplified the 1st, removed BFS traversing allTogether except for the adjList
 *
 * The core now sinmply checks that agent is positined in 1 vertice near the gatay or not.
 * If not, it will block a random node next to agent -> can't hurt
 * If only 1 vertice is the distance - block it.
 *
 *
 *
 */

var inputsAlt = readline().split(" ");
const NAlt = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const LAlt = parseInt(inputs[1]); // the number of links / edges
const EAlt = parseInt(inputs[2]); // the number of exit gateways
console.error(
  `ENTRY:\r\nTotal nodes: ${NAlt}\r\nLinks: ${LAlt}\r\nExit gateaways: ${EAlt}`
);

//creation of adjecency list
let adjListAlt = Array.apply(null, Array(NAlt)).map(function () {
  return Array.apply(null, Array(NAlt)).map(function () {
    return 0;
  });
});

//fill the 1-s and 0-s
for (let i = 0; i < L; i++) {
  var inputsAlt = readline().split(" ");
  const N1Alt = parseInt(inputsAlt[0]); // N1 and N2 defines a link between these nodes
  const N2Alt = parseInt(inputsAlt[1]);
  console.error(`Link ${i}: ${N1Alt} - ${N2Alt}`);
  adjListAlt[N1Alt][N2Alt] = 1;
  adjListAlt[N2Alt][N1Alt] = 1;
}
console.error(adjListAlt);
var gatewaysAlt = [];
for (let i = 0; i < E; i++) {
  const EIAlt = parseInt(readline()); // the index of a gateway node
  console.error(`Gataway index ${i}: ${EIAlt}`);
  gateways.push(EIAlt);
}

// game loop
while (true) {
  const SIAlt = parseInt(readline()); // The index of the node on which the Bobnet agent is positioned this turn
  console.error(`Bobnet is positioned at ${SIAlt}`);

  //very close ssumption. If bobnet is positioned at 1 node close to any gateaway -> shut it down
  var nodeCloseAlt = false;
  for (const g of gatewaysAlt) {
    if (adjListAlt[SIAlt][g] === 1) {
      console.log(`${SI} ${g}`);
      nodeCloseAlt = true;
    }
  }
  if (!nodeCloseAlt) {
    var currentAgentConnectionsAlt = adjListAlt[SIAlt];
    console.log(`${SIAlt} ${currentAgentConnectionsAlt.indexOf(1)}`);
  }
}

/**
 *
 *
 * Solutuion 3
 * This on actully does use BFS in full
 *
 *
 */

/**
 * const inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways

var id = 0;
class Node {
    constructor() {
        this.id = id++;
        this.links = [];
        this.isExitNode = false;
    }
    
    hasLink(nodeID) {
        return this.links.indexOf(nodeID) > -1;
    }
    
    hasExitLink() {
        return this.links.find(nodeID => nodes[nodeID].isExitNode);
    }

    addLink(nodeID) {
        if (this.links.indexOf(nodeID) === -1) {
            this.links.push(nodeID);
        }
    }

    removeLink(nodeID) {
        var index = this.links.indexOf(nodeID);
        if (index > -1) {
            this.links.splice(index, 1);
        }
    }
}

function unlink(nodeA, nodeB){
    nodeA.removeLink(nodeB.id);
    nodeB.removeLink(nodeA.id);
    
    return [nodeA.id, nodeB.id].sort((a, b) => a - b).join(" ");
}

// Create all the nodes.
var nodes = [];
for (var i = 0; i < N; i++) {
    nodes.push(new Node());
}

// Add the links.
for (let i = 0; i < L; i++) {
    let inputs = readline().split(' ');
    let N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    let N2 = parseInt(inputs[1]);

    nodes[N1].addLink(N2);
    nodes[N2].addLink(N1);
}

// Add the exits.
for (let i = 0; i < E; i++) {
    let EI = parseInt(readline()); // the index of a gateway node
    nodes[EI].isExitNode = true;
    printErr("Exit: " + EI);
}

// TODO: create BFS algorithm.
function severeLink(skyNetNode){
    var nodeA, nodeB;
    
    printErr("SkyNet exit link ID: " + skyNetNode.hasExitLink());
    
    if (skyNetNode.hasExitLink() !== undefined) {
        nodeA = skyNetNode;
        nodeB = nodes[skyNetNode.hasExitLink()];
    } else {
        nodeA = skyNetNode;
        nodeB = nodes[skyNetNode.links[0]];
    }
    
    return unlink(nodeA, nodeB);
}

// Game loop.
while (true) {
    // The index of the node on which the Skynet agent is positioned this turn.
    let SI = parseInt(readline());
    printErr("SkyNet: " + SI);
    print(severeLink(nodes[SI]));
}





 */

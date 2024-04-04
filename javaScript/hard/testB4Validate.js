/* TEST CASE 
6
Dessert
Apero
Plat
Entree
Fromage
Cafe
5
Apero before Dessert
Dessert after Plat
Plat after Entree
Apero before Entree
Fromage before Dessert

out:

Apero
Entree
Plat
Fromage
Dessert
Cafe */

/**
 * Comment
 * This is a task to perform a Typological search over nodes.
 */

/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/

const orders = {
  before: "<",
  after: ">",
};
let comparisons = [];
let actions = [];
const N = parseInt(readline());
for (let i = 1; i <= N; i++) {
  actions.push({ action: readline(), valur: i });
}
const nbOrders = parseInt(readline());
for (let i = 0; i < nbOrders; i++) {
  comparisons.push(
    readline().replace("before", orders.before).replace("after", orders.after)
  );
}

comparisons.forEach((c) => {
  if (c.includes(">")) {
    let newA = `${c.split(" ")[2]} < ${c.split(" ")[0]}`;
    comparisons[comparisons.findIndex((i) => i == c)] = newA;
  }
});
console.error(actions);
console.error(JSON.stringify(comparisons, null, 2));

if (comparisons.length === 1) {
  console.log(comparisons[0].split(" ")[0]);
  console.log(comparisons[0].split(" ")[2]);
} else {
  let finalArray = comparisons.map((x) => [x.split(" ")[0], x.split(" ")[2]]);
  //console.error(`finalArray `+finalArray + typeof(finalArray))

  /* [
        [ 'Share', 'Disconnect' ],
        [ 'Win', 'Share' ],
        [ 'Connect', 'Play' ],
        [ 'Play', 'Win' ]
    ] */

  //solution for topological search

  class Graph {
    constructor() {
      this.adjacencyList = {};
    }
    addVertex(vertex) {
      if (!this.adjacencyList[vertex]) {
        this.adjacencyList[vertex] = [];
      }
    }
    addEdge(v1, v2) {
      this.adjacencyList[v1].push(v2);
    }
  }

  const graph = (function () {
    const g = new Graph();
    //["A", "B", "C", "D", "E"].forEach((v) => g.addVertex(v));
    for (const a of actions) {
      g.addVertex(a.action);
    }
    for (const b of finalArray) {
      g.addEdge(b[1], b[0]);
    }
    return g;
  })();
  function dfsTopSortHelper(v, n, visited, topNums) {
    visited[v] = true;
    const neighbors = graph.adjacencyList[v];
    for (const neighbor of neighbors) {
      if (!visited[neighbor]) {
        n = dfsTopSortHelper(neighbor, n, visited, topNums);
      }
    }
    topNums[v] = n;
    return n - 1;
  }
  function dfsTopSort(graph) {
    const vertices = Object.keys(graph.adjacencyList);
    const visited = {};
    const topNums = {};
    let n = vertices.length - 1;
    for (const v of vertices) {
      if (!visited[v]) {
        n = dfsTopSortHelper(v, n, visited, topNums);
      }
    }
    return topNums;
  }

  console.log(Object.keys(dfsTopSort(graph)).join("\n"));
}

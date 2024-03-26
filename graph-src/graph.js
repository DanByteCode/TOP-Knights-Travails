import { Node } from "./graph-node.js";
export function Graph(data) {
  let main = new Node(data)
  const startRow = ()=>{return main.data[0]}
  const startCol = ()=>{return main.data[1]}
  function addToNode(data, node = main) {
    let parentNode = node
    if (Array.isArray(node)) {
      parentNode = depthSearchNode(node)
    }
    parentNode.conect(new Node(data,parentNode))
  }
  function depthSearchNode(info, node = main) {
    if (info[0] == node.data[0] && info[1] == node.data[1]) {
      return node
    }
    for (let adj of node.adjacents) {
      const find = depthSearchNode(info, adj)
      if (find) {
        return find
      }
    }
    return null
  }
  function getPath(node, array = []) {
    if(node.parent == null){
      return
    } else {
      array.push(node.data)
      getPath(node.parent, array)
      return array
    }
  }
  function printNodes(node = main, prefix = "") {
    console.log(`${prefix}└──[${node.data}]`);
    if (node.adjacents.length > 0) {
      node.adjacents.forEach((a) => {
        printNodes(a, `${prefix}     `);
  
      })
    }
  }
  return { main, startRow,startCol, depthSearchNode,
     addToNode, printNodes, getPath}
}
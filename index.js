import { knightMoves } from "./knights-travails.js";

//Basic Examples
knightMoves([0,0],[1,2]);
knightMoves([0,0],[3,3]);
knightMoves([3,3],[0,0]);
knightMoves([3,3],[4,3])
//The third parameter is to print the board
console.log("Printing the board:");
knightMoves([0, 0], [7, 7], true);
//The fourth parameter is to print the nodes of the graph
console.log("Printing the nodes:");
knightMoves([2,0], [3,3], false, true)
//An example of both cases
console.log("Printing the nodes and board:");
knightMoves([1,1], [4,4], true, true)
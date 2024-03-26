import { Graph } from "./graph-src/graph.js"
export const knightMoves = (start, final, printBoard, printNodes) => {
    const waterfall = new Graph(start)
    const queue = [waterfall.main]
    let finishied = false
    let path = []
    const board = createMatrix()
    
    findShortPlay()
    function createMatrix() {
        const res = new Array(8)
        for (let r = 0; r < 8; r++) {
            res[r] = new Array(8).fill(0)
        }
        res[start[0]][start[1]] = 'S'
        res[final[0]][final[1]] = 'F'
        return res
    }
    function findShortPlay() {
        findFinal()
        path = waterfall.getPath(waterfall.depthSearchNode(finishied)).reverse()
        for (let p = 0; p < path.length; p++) {
            board[path[p][0]][path[p][1]] = p + 1
        }
    }
    function findFinal() {
        const altBoard = createMatrix()
        let cont = 1
        while (queue.length > 0 && !finishied) {
            let current = queue.shift()
            let moves = getMove(current.data, altBoard, cont++)
            for (let i = 0; i < moves.length; i++) {
                let mov = moves[i]
                waterfall.addToNode(moves[i], current)
                altBoard[mov[0]][mov[1]] = i
                queue.push(current.adjacents[i])
            }
        }
    }
    function getMove(pos, altBoard = board, cont = 1) {
        const row = pos[0]
        const col = pos[1]
        const moves = []
        for (let i = row - 2; i <= row + 2; i++) {
            for (let j = col - 2; j <= col + 2; j++) {
                if (i >= 0 && i < 8 && j >= 0 && j < 8) {
                    let current = altBoard[i][j]
                    if ((current != cont || current == 0) &&
                        (current != 'S' && current !== altBoard[row][col])
                        && (Math.abs(i - row) + Math.abs(j - col) == 3)) {
                        moves.push([i, j])
                        if (altBoard[i][j] == 'F') {
                            finishied = [i, j]
                            break
                        }
                    }
                }
            }
        }
        return moves
    }

    function printFinalBoard() {
        let prt = `   -------KNIGHTS TRAVAILS--------\n`
        prt += `    0 │ 1 │ 2 │ 3 │ 4 │ 5 │ 6 │ 7  \n`
        prt += `  ╔═══╦═══╦═══╦═══╦═══╦═══╦═══╦═══╗\n`
        for (let r = 0; r < 8; r++) {
            prt += `${r} `
            for (let c = 0; c < 8; c++) {
                prt += `║ ${board[r][c] ? board[r][c] : " "} `
            }
            prt += `║\n`
            if (r < 7) {
                prt += `——╠═══╬═══╬═══╬═══╬═══╬═══╬═══╬═══╣\n`
            }
        }
        prt += `  ╚═══╩═══╩═══╩═══╩═══╩═══╩═══╩═══╝\n`
        prt += `       START: ${start} → FINAL: ${final}`
        console.log(prt);
    }
    function printResult(){
        let res = `You made it in ${path.length} moves! Here's your path:\n`
        res += `▸ ${start}\n`
        for (const p of path) {
            res += `▸ ${p}\n`
        }
        console.log(res);
    }
    if (printNodes) { waterfall.printNodes() }
    if (printBoard) { printFinalBoard() }
    printResult()
    return path
}


export function Node(d = null, p = null){
    const data = d
    const parent = p
    let adjacents = []
    function conect(node){
        adjacents.push(node)
    }
    return {data, adjacents, conect, parent}
}
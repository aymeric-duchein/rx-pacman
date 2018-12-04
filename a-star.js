
function manhattan(neigh, end) {
    return Math.abs(end.row - neigh.row)+ Math.abs(end.column - neigh.column);
}

function neighbors(grid, {row, column}) {
    let ret = [];
    if(column-1 >= 0 && grid[row][column-1].v === 0) {
        ret.push(grid[row][column-1]);
    }
    if(column+1 < 28 && grid[row][column+1].v === 0) {
        ret.push(grid[row][column+1]);
    }
    if(row-1 >= 0 && grid[row-1][column].v === 0) {
        ret.push(grid[row-1][column]);
    }
    if(row+1 < 31 && grid[row+1][column].v === 0) {
        ret.push(grid[row+1][column]);
    }
    return ret;
}

function init(matrix) {
    let grid = [];
    for(let row = 0; row < 31; row++) {
        grid[row] = [];
        for(let column = 0; column < 28; column++) {
            grid[row][column] = {
                row,
                column,
                v: matrix[row][column],
                f: 0,
                g: 0,
                h: 0,
                cost: 1,
                visited: false,
                closed: false,
                parent: null,
            };
        }
    }
    return grid;
}
function heap() {
    return new BinaryHeap(function(node) {
        return node.f;
    });
}

function search(matrix, start, end) {
    const grid = init(matrix);
    const heuristic = manhattan;

    const openHeap = heap();
    openHeap.push(grid[start.row][start.column]);
    while(openHeap.size() > 0) {

        let currentNode = openHeap.pop();

        if(currentNode.column === end.column && currentNode.row === end.row) {
            let curr = currentNode;
            const ret = [];
            while(curr.parent) {
                ret.push(curr);
                curr = curr.parent;
            }
            return ret.reverse();
        }

        currentNode.closed = true;
        const neighborsList = neighbors(grid, currentNode);
        for(let i= 0; i < neighborsList.length; i++) {
            let neighbor = neighborsList[i];

            if(neighbor.closed) {
                continue;
            }

            const gScore = currentNode.g + neighbor.cost;
            const beenVisited = neighbor.visited;

            if(!beenVisited || gScore < neighbor.g) {

                neighbor.visited = true;
                neighbor.parent = currentNode;
                neighbor.h = neighbor.h || heuristic(neighbor, grid[end.row][end.column]);
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;

                if (!beenVisited) {
                    openHeap.push(neighbor);
                }
                else {
                    openHeap.rescoreElement(neighbor);
                }
            }
        }
    }
    return [];
}
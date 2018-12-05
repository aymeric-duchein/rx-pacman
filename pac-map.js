// 28 * 31
const MAP_MATRIX = [
    [6,2,2,2,2,2,2,2,2,2,2,2,2,5,6,2,2,2,2,2,2,2,2,2,2,2,2,5],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,6,2,2,5,0,6,2,2,2,5,0,1,1,0,6,2,2,2,5,0,6,2,2,5,0,1],
    [1,0,1,7,7,1,0,1,7,7,7,1,0,1,1,0,1,7,7,7,1,0,1,7,7,1,0,1],
    [1,0,3,2,2,4,0,3,2,2,2,4,0,3,4,0,3,2,2,2,4,0,3,2,2,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,6,2,2,5,0,6,5,0,6,2,2,2,2,2,2,5,0,6,5,0,6,2,2,5,0,1],
    [1,0,3,2,2,4,0,1,1,0,3,2,2,5,6,2,2,4,0,1,1,0,3,2,2,4,0,1],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [3,2,2,2,2,5,0,1,3,2,2,5,0,1,1,0,6,2,2,4,1,0,6,2,2,2,2,4],
    [7,7,7,7,7,1,0,1,6,2,2,4,0,3,4,0,3,2,2,5,1,0,1,7,7,7,7,7],
    [7,7,7,7,7,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,7,7,7,7,7],
    [7,7,7,7,7,1,0,1,1,0,6,2,2,8,8,2,2,5,0,1,1,0,1,7,7,7,7,7],
    [2,2,2,2,2,4,0,3,4,0,1,7,7,7,7,7,7,1,0,3,4,0,3,2,2,2,2,2],
    [0,0,0,0,0,0,0,0,0,0,1,7,7,7,7,7,7,1,0,0,0,0,0,0,0,0,0,0],
    [2,2,2,2,2,5,0,6,5,0,1,7,7,7,7,7,7,1,0,6,5,0,6,2,2,2,2,2],
    [7,7,7,7,7,1,0,1,1,0,3,2,2,2,2,2,2,4,0,1,1,0,1,7,7,7,7,7],
    [7,7,7,7,7,1,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,1,7,7,7,7,7],
    [7,7,7,7,7,1,0,1,1,0,6,2,2,2,2,2,2,5,0,1,1,0,1,7,7,7,7,7],
    [6,2,2,2,2,4,0,3,4,0,3,2,2,5,6,2,2,4,0,3,4,0,3,2,2,2,2,5],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,6,2,2,5,0,6,2,2,2,5,0,1,1,0,6,2,2,2,5,0,6,2,2,5,0,1],
    [1,0,3,2,5,1,0,3,2,2,2,4,0,3,4,0,3,2,2,2,4,0,1,6,2,4,0,1],
    [1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1],
    [3,2,5,0,1,1,0,6,5,0,6,2,2,2,2,2,2,5,0,6,5,0,1,1,0,6,2,4],
    [6,2,4,0,3,4,0,1,1,0,3,2,2,5,6,2,2,4,0,1,1,0,3,4,0,3,2,5],
    [1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1],
    [1,0,6,2,2,2,2,4,3,2,2,5,0,1,1,0,6,2,2,4,3,2,2,2,2,5,0,1],
    [1,0,3,2,2,2,2,2,2,2,2,4,0,3,4,0,3,2,2,2,2,2,2,2,2,4,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4],
];

function drawMap(gridPixelSize) {
    let rowIndex = 0;
    for(let row of MAP_MATRIX) {
        let columnIndex = 0;
        for(let value of row) {
            switch (value) {
                case 0:
                    fill(0,0,0);
                    stroke(0,0,0);
                    rect(columnIndex * gridPixelSize, rowIndex * gridPixelSize, gridPixelSize, gridPixelSize);
                    break;
                case 1:
                    stroke(20,20,200);
                    strokeWeight(2);
                    line(columnIndex * gridPixelSize + gridPixelSize / 2, rowIndex * gridPixelSize, columnIndex * gridPixelSize + gridPixelSize / 2, rowIndex * gridPixelSize + gridPixelSize );
                    break;
                case 2:
                    stroke(20,20,200);
                    strokeWeight(2);
                    line(columnIndex * gridPixelSize, rowIndex * gridPixelSize + gridPixelSize / 2, columnIndex * gridPixelSize + gridPixelSize, rowIndex * gridPixelSize + gridPixelSize  / 2);
                    break;
                case 3:
                    noFill();
                    stroke(20,20,200);
                    strokeWeight(2);
                    arc(columnIndex * gridPixelSize  + gridPixelSize, rowIndex * gridPixelSize, gridPixelSize, gridPixelSize, HALF_PI, PI);
                    break;
                case 4:
                    noFill();
                    stroke(20,20,200);
                    strokeWeight(2);
                    arc(columnIndex * gridPixelSize, rowIndex * gridPixelSize, gridPixelSize, gridPixelSize, 0, HALF_PI);
                    break;
                case 5:
                    noFill();
                    stroke(20,20,200);
                    strokeWeight(2);
                    arc(columnIndex * gridPixelSize , rowIndex * gridPixelSize + gridPixelSize, gridPixelSize, gridPixelSize, PI + HALF_PI, 0);
                    break;
                case 6:
                    noFill();
                    stroke(20,20,200);
                    strokeWeight(2);
                    arc(columnIndex * gridPixelSize  + gridPixelSize, rowIndex * gridPixelSize + gridPixelSize, gridPixelSize, gridPixelSize, PI, PI + HALF_PI);
                    break;
                case 8:
                    stroke(240,240,50);
                    strokeWeight(2);
                    line(columnIndex * gridPixelSize, rowIndex * gridPixelSize + gridPixelSize / 2, columnIndex * gridPixelSize + gridPixelSize, rowIndex * gridPixelSize + gridPixelSize  / 2);
                    break;
            }
            columnIndex++;
        }
        rowIndex++;
    }
}

function getOpenSpot() {
    let column = Math.floor(Math.random() * 27), row = Math.floor(Math.random() * 30);
    while (MAP_MATRIX[row][column] !== 0) {
        column = Math.floor(Math.random() * 27);
        row = Math.floor(Math.random() * 30);
    }
    return {column,row}
}

function drawOpenSpot({row, column}, gridPixelSize, r = 200, g= 50, b = 50, diff = 5) {
    fill(r,g,b);
    stroke(r,g,b);
    rect(column * gridPixelSize + diff, row * gridPixelSize + diff, gridPixelSize -  2 * diff, gridPixelSize - 2 * diff);
}
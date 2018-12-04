const GRID_SIZE = 20;
let pacMan, inputDir = 0, blinky, blinkyDir = 0;
let start;
function setup() {
    const canvasWidth = 28 * GRID_SIZE;
    const canvasHeigth = 31 * GRID_SIZE;
    frameRate(30);

    createCanvas(canvasWidth, canvasHeigth);
    drawMap(GRID_SIZE);

    start = getOpenSpot();
    pacMan = new Char(5, 8, MAP_MATRIX, GRID_SIZE, 255,255,0);
    blinky = new Char(start.column, start.row, MAP_MATRIX, GRID_SIZE, 200, 25, 25);
}

function draw() {
    drawMap(GRID_SIZE);

    let path = search(MAP_MATRIX, blinky, pacMan);
    path = [blinky, ...path];
    path.forEach(p => drawOpenSpot(p, GRID_SIZE, 12, 200, 12, 8));

    if (!(frameCount % 4)) {
        pacMan.setDir(inputDir)
    }
    pacMan.move(frameCount % 4);
    if (!(frameCount % 4)) {
        if (path.length > 1) {
            if (path[0].row === path[1].row) {
                blinkyDir = path[0].column > path[1].column ? 3: 1
            } else {
                blinkyDir = path[0].row > path[1].row ? 2: 0
            }
        }

        blinky.setDir(blinkyDir)
    }
    blinky.move(frameCount % 4);

    pacMan.draw();
    blinky.draw();
}

function keyPressed() {
    switch (keyCode) {
        case DOWN_ARROW:  inputDir = 0;break;
        case RIGHT_ARROW: inputDir = 1;break;
        case UP_ARROW:    inputDir = 2;break;
        case LEFT_ARROW:  inputDir = 3;break;
    }
}
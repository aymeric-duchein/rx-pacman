const GRID_SIZE = 20;
let pacMan, inputDir = 0, blinky,pinky,inky, clyde;
function setup() {
    const canvasWidth = 28 * GRID_SIZE;
    const canvasHeigth = 31 * GRID_SIZE;
    frameRate(30);

    createCanvas(canvasWidth, canvasHeigth);
    drawMap(GRID_SIZE);

    pacMan = new Char(5, 8, MAP_MATRIX, GRID_SIZE, 255,255,20);
    blinky = new Ghost(MAP_MATRIX, GRID_SIZE);
    pinky = new Ghost(MAP_MATRIX, GRID_SIZE);
    inky = new Ghost(MAP_MATRIX, GRID_SIZE);
    clyde = new Ghost(MAP_MATRIX, GRID_SIZE);
}

function draw() {
    background(0);
    drawMap(GRID_SIZE);

    console.log(touches[0]);
    if (touches[0]) {
        if (touches[0].x >= touches[0].y) {
            if (touches[0].x + touches[0].y < 59*GRID_SIZE / 2) {
                inputDir = 2
            } else {
                inputDir = 1
            }
        } else {
            if (touches[0].x + touches[0].y < 59*GRID_SIZE / 2) {
                inputDir = 3
            } else {
                inputDir = 0
            }
        }
    }
    if (!(frameCount % 4)) {
        pacMan.setDir(inputDir)
    }
    pacMan.move(frameCount % 4, 4);

    blinky.update(frameCount, pacMan);
    pinky.update(frameCount, pacMan);
    inky.update(frameCount, pacMan, blinky);
    clyde.update(frameCount, pacMan);

    pacMan.draw();

    blinky.draw();
    pinky.draw();
    inky.draw();
    clyde.draw();
}

function keyPressed() {
    switch (keyCode) {
        case DOWN_ARROW:  inputDir = 0;break;
        case RIGHT_ARROW: inputDir = 1;break;
        case UP_ARROW:    inputDir = 2;break;
        case LEFT_ARROW:  inputDir = 3;break;
    }
}
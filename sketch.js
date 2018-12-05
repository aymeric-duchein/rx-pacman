const GRID_SIZE = 20;
let pacMan, inputDir = 0, blinky, blinkyDir = 0, pinky, pinkyDir = 0,inky, inkyDir = 0, clyde, clydeDir = 0;
let blinkyStart, pinkyStart, inkyStart, clydeStart;
function setup() {
    const canvasWidth = 28 * GRID_SIZE;
    const canvasHeigth = 31 * GRID_SIZE;
    frameRate(30);

    createCanvas(canvasWidth, canvasHeigth);
    drawMap(GRID_SIZE);

    blinkyStart = getOpenSpot();
    pinkyStart = getOpenSpot();
    inkyStart = getOpenSpot();
    clydeStart = getOpenSpot();
    pacMan = new Char(5, 8, MAP_MATRIX, GRID_SIZE, 255,255,0);
    blinky = new Char(blinkyStart.column, blinkyStart.row, MAP_MATRIX, GRID_SIZE, 200, 25, 25);
    pinky = new Char(pinkyStart.column, pinkyStart.row, MAP_MATRIX, GRID_SIZE, 255, 155, 240);
    inky = new Char(inkyStart.column, inkyStart.row, MAP_MATRIX, GRID_SIZE, 20, 255, 255);
    clyde = new Char(clydeStart.column, clydeStart.row, MAP_MATRIX, GRID_SIZE, 255, 175, 20);
    blinky.setVelocity(GRID_SIZE / 5);
    pinky.setVelocity(GRID_SIZE / 5);
    inky.setVelocity(GRID_SIZE / 5);
    clyde.setVelocity(GRID_SIZE / 5);
}

function draw() {
    drawMap(GRID_SIZE);

    if (!(frameCount % 4)) {
        pacMan.setDir(inputDir)
    }
    pacMan.move(frameCount % 4, 4);

    let blinkyPath = search(MAP_MATRIX, blinky, pacMan, blinkyDir);
    blinkyPath = [blinky, ...blinkyPath];
    blinkyPath.filter((_,i) => !(i%2)).forEach(p => drawOpenSpot(p, GRID_SIZE, 200, 25, 25, 8));

    if (!(frameCount % 5)) {
        if (blinkyPath.length > 1) {
            if (blinkyPath[0].row === blinkyPath[1].row) {
                blinkyDir = blinkyPath[0].column > blinkyPath[1].column ? (blinkyDir === 1 ? 1: 3): (blinkyDir === 3 ? 3:1)
            } else {
                blinkyDir = blinkyPath[0].row > blinkyPath[1].row ? (blinkyDir === 0 ? 0: 2): (blinkyDir === 2 ? 2: 0)
            }
        }

        blinky.setDir(blinkyDir)
    }
    blinky.move(frameCount % 5, 5);

    let pinkyTarget = {
        row: (pacMan.row + 4 * + Math.round(Math.cos(pacMan.dir * Math.PI / 2)) + 31) % 31,
        column: ( pacMan.column + 4 * + Math.round(Math.sin(pacMan.dir * Math.PI / 2)) + 28) % 28
    };
    let pinkyPath = search(MAP_MATRIX, pinky, pinkyTarget, pinkyDir);
    pinkyPath = [pinky, ...pinkyPath];
    pinkyPath.filter((_,i) => !(i%2)).forEach(p => drawOpenSpot(p, GRID_SIZE, 250, 130, 250, 8));
    if (!(frameCount % 5)) {
        if (pinkyPath.length > 1) {
            if (pinkyPath[0].row === pinkyPath[1].row) {
                pinkyDir = pinkyPath[0].column > pinkyPath[1].column ? (pinkyDir === 1 ? 1: 3): (pinkyDir === 3 ? 3:1)
            } else {
                pinkyDir = pinkyPath[0].row > pinkyPath[1].row ? (pinkyDir === 0 ? 0: 2): (pinkyDir === 2 ? 2: 0)
            }
        }

        pinky.setDir(pinkyDir)
    }
    pinky.move(frameCount % 5, 5);

    let inkyTarget = {
        row: (pacMan.row + 2 * + Math.round(Math.cos(pacMan.dir * Math.PI / 2)) + 31) % 31,
        column: ( pacMan.column + 2 * + Math.round(Math.sin(pacMan.dir * Math.PI / 2)) + 28) % 28
    };
    let drow = inkyTarget.row - blinky.row;
    let dcol = inkyTarget.column - blinky.column;
    inkyTarget = {
        row: (inkyTarget.row + 2 * drow + 310) % 31,
        column: (inkyTarget.column + 2 * dcol + 280) % 28,
    };
    let inkyPath = search(MAP_MATRIX, inky, inkyTarget, inkyDir);
    inkyPath = [inky, ...inkyPath];
    inkyPath.filter((_,i) => !(i%2)).forEach(p => drawOpenSpot(p, GRID_SIZE, 20, 255, 255, 8));
    if (!(frameCount % 5)) {
        if (inkyPath.length > 1) {
            if (inkyPath[0].row === inkyPath[1].row) {
                inkyDir = inkyPath[0].column > inkyPath[1].column ? (inkyDir === 1 ? 1: 3): (inkyDir === 3 ? 3:1)
            } else {
                inkyDir = inkyPath[0].row > inkyPath[1].row ? (inkyDir === 0 ? 0: 2): (inkyDir === 2 ? 2: 0)
            }
        }

        inky.setDir(inkyDir)
    }
    inky.move(frameCount % 5, 5);

    let clydeTarget = manhattan(pacMan, clyde) < 8 ? { row: 30, column: 0 } : pacMan;
    let clydePath = search(MAP_MATRIX, clyde, clydeTarget, clydeDir);
    clydePath = [clyde, ...clydePath];
    clydePath.filter((_,i) => !(i%2)).forEach(p => drawOpenSpot(p, GRID_SIZE, 255, 175, 20, 8));
    if (!(frameCount % 5)) {
        if (clydePath.length > 1) {
            if (clydePath[0].row === clydePath[1].row) {
                clydeDir = clydePath[0].column > clydePath[1].column ? (clydeDir === 1 ? 1: 3): (clydeDir === 3 ? 3:1)
            } else {
                clydeDir = clydePath[0].row > clydePath[1].row ? (clydeDir === 0 ? 0: 2): (clydeDir === 2 ? 2: 0)
            }
        }

        clyde.setDir(clydeDir)
    }
    clyde.move(frameCount % 5, 5);

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
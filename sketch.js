const GRID_SIZE = 20;
let pacMan, blinky, pinky, inky, clyde;
let pellets;

function setup() {
    const canvasWidth = 28 * GRID_SIZE;
    const canvasHeigth = 31 * GRID_SIZE;
    frameRate(30);

    createCanvas(canvasWidth, canvasHeigth + 50);

    pellets = initPellets();
    pacMan = new PacMan(MAP_MATRIX, GRID_SIZE, pellets);
    blinky = new Ghost(MAP_MATRIX, GRID_SIZE);
    pinky = new Ghost(MAP_MATRIX, GRID_SIZE);
    inky = new Ghost(MAP_MATRIX, GRID_SIZE);
    clyde = new Ghost(MAP_MATRIX, GRID_SIZE);

    textSize(30);
    fill(0, 102, 153);
    text('SCORE', 20, canvasHeigth + 10)
}

function draw() {
    background(0);
    textSize(15);
    fill(255,255,20);
    stroke(20,20,200);
    strokeWeight(1);
    textAlign(LEFT);
    text('SCORE :', 20, 31 * GRID_SIZE + 10);
    textAlign(RIGHT);
    text((pellets.length - pacMan.pellets.length) * 10, 100, 31 * GRID_SIZE + 10, 40);
    drawMap(GRID_SIZE);

    pacMan.update(frameCount);
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


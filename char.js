const DOWN_DIR = 0, RIGHT_DIR = 1, UP_DIR = 2, LEFT_DIR = 3;

function Char(column, row, matrix, gridSize, r, g, b) {
    this.column = column;
    this.row = row;
    this.r = r || Math.floor(Math.random() * 255);
    this.g = g || Math.floor(Math.random() * 255);
    this.b = b || Math.floor(Math.random() * 255);
    this.dir = 0;
    this.matrix = matrix;
    this.velocity = gridSize / 4;
    this.posX = this.column * gridSize + gridSize / 2;
    this.posY = this.row * gridSize + gridSize / 2;
    this.gridSize = gridSize;
    this.moving = false;
}

Char.prototype = {
    move: function(frameCount, frameCycle) {
        if (isEmptySpace(this.matrix, nextRow(this.row, this.dir), nextCol(this.column, this.dir)) && frameCount === 0) {
            this.moving = true;
            this.posX += this.velocity * Math.sin(this.dir * Math.PI / 2);
            this.posY += this.velocity * Math.cos(this.dir * Math.PI / 2);
        }
        if (frameCount && this.moving) {
            this.posX += this.velocity * Math.sin(this.dir * Math.PI / 2);
            this.posY += this.velocity * Math.cos(this.dir * Math.PI / 2);
        }
        if (frameCount === frameCycle - 1 && this.moving) {
            this.moving = false;
            this.column = (Math.floor(this.posX/this.gridSize) + 28) % 28;
            this.row = (Math.floor(this.posY/this.gridSize) + 31) % 31;
            this.posX = this.column * this.gridSize + this.gridSize / 2;
            this.posY = this.row * this.gridSize + this.gridSize / 2;
        }
    },
    draw: function() {
        fill(this.r,this.g,this.b);
        stroke(this.r,this.g,this.b);
        rect(this.posX -  this.gridSize / 2, this.posY -  this.gridSize / 2,  this.gridSize - 1,  this.gridSize - 1, this.gridSize/2);
    },
    setDir: function(dir) {
        this.dir = dir;
    },
};

let inputDir = 0;
function PacMan(matrix, gridSize, pellets) {
    this.column = 14;
    this.row = 23;
    this.r = 255;
    this.g = 255;
    this.b = 20;
    this.dir = LEFT_DIR;
    this.matrix = matrix;
    this.velocity = gridSize / 4;
    this.posX = this.column * gridSize + gridSize / 2;
    this.posY = this.row * gridSize + gridSize / 2;
    this.gridSize = gridSize;
    this.moving = false;
    this.pellets = pellets;
}

PacMan.prototype = {
    ...Char.prototype,
    update: function(frame) {
        touchControl();

        if (!(frame % 4)) {
            this.setDir(inputDir)
        }
        this.move(frame % 4, 4);
        if (!(frame % 4)) {
            this.pellets = this.pellets.filter(p => p.row !== this.row || p.column !== this.column)
        }

    },
    draw: function() {
        fill(this.r,this.g,this.b);
        stroke(this.r,this.g,this.b);
        rect(this.posX -  this.gridSize / 2, this.posY -  this.gridSize / 2,  this.gridSize - 1,  this.gridSize - 1, this.gridSize/2);
        this.pellets.forEach(p => drawPellet(p, this.gridSize));
    }
};

function keyPressed() {
    switch (keyCode) {
        case DOWN_ARROW:  inputDir = DOWN_DIR;break;
        case RIGHT_ARROW: inputDir = RIGHT_DIR;break;
        case UP_ARROW:    inputDir = UP_DIR;break;
        case LEFT_ARROW:  inputDir = LEFT_DIR;break;
    }
}


function touchControl() {
    const primaryTouch = touches[0];

    if (primaryTouch) {
        const upperRight = primaryTouch.x >= primaryTouch.y;
        const upperLeft = primaryTouch.x + primaryTouch.y < 59 * GRID_SIZE / 2;

        if (upperRight && upperLeft) {
            inputDir = UP_DIR;
        } else if (upperRight && !upperLeft) {
            inputDir = RIGHT_DIR;
        } else if (upperLeft && !upperRight) {
            inputDir = LEFT_DIR;
        } else if (!upperRight && !upperLeft) {
            inputDir = DOWN_DIR
        }
    }
}

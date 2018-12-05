let ghostNb = 0;
const BLINKY = {
    name: 'blinky',
    column :1,
    row: 1,
    r: 200,
    g: 25,
    b: 25
};
const PINKY = {
    name: 'pinky',
    column :26,
    row: 1,
    r: 255,
    g: 155,
    b: 240
};
const INKY = {
    name: 'inky',
    column :26,
    row: 29,
    r: 20,
    g: 255,
    b: 255
};
const CLYDE = {
    name: 'clyde',
    column :1,
    row: 29,
    r: 255,
    g: 175,
    b: 20
};
function Ghost(matrix, gridSize) {
    switch (ghostNb) {
        case 0:
            this.init(BLINKY);
            break;
        case 1:
            this.init(PINKY);
            break;
        case 2:
            this.init(INKY);
            break;
        case 3:
            this.init(CLYDE);
            break;
    }
    this.dir = 0;
    this.matrix = matrix;
    this.velocity = gridSize / 5;
    this.posX = this.column * gridSize + gridSize / 2;
    this.posY = this.row * gridSize + gridSize / 2;
    this.gridSize = gridSize;
    this.moving = false;
    ghostNb++;
}

Ghost.prototype = {
    ...Char.prototype,
    init: function(ghost) {
        for (key in ghost) this[key] = ghost[key]

    },
    update: function(frame, pacMan, blinky) {
        let path = search(this.matrix, this, this.getTarget(pacMan, blinky), this.dir);
        path = [this, ...path];
        path.filter((_,i) => !(i%2)).forEach(p => drawOpenSpot(p, this.gridSize, this.r, this.g, this.b, 8));

        if (!(frame % 5)) {
            if (path.length > 1) {
                if (path[0].row === path[1].row) {
                    this.setDir(path[0].column > path[1].column ? (this.dir === 1 ? 1: 3): (this.dir === 3 ? 3:1))
                } else {
                    this.setDir(path[0].row > path[1].row ? (this.dir === 0 ? 0: 2): (this.dir === 2 ? 2: 0))
                }
            }
        }
        this.move(frame % 5, 5);
    },
    draw: function() {
        fill(this.r,this.g,this.b);
        stroke(this.r,this.g,this.b);
        rect(this.posX -  this.gridSize / 2 + 1, this.posY -  this.gridSize / 2 + 1,  this.gridSize - 2,  this.gridSize - 2, this.gridSize/2,this.gridSize/2,0,0);
        fill(255);
        stroke(255);
        ellipse(this.posX -3, this.posY -3,  4,  6);
        ellipse(this.posX +3, this.posY -3,  4,  6);
    },
    getTarget: function(pacMan, blinky) {
        let target;

        switch (this.name) {
            case 'blinky':
                target = pacMan;
                break;
            case 'pinky':
                target = generatePinkyTarget(pacMan);
                break;
            case 'inky':
                target = generateInkyTarget(pacMan, blinky);
                break;
            case 'clyde':
                target = manhattan(pacMan, this) < 8 ? { row: 30, column: 0 } : pacMan;
                break;
        }
        return target;
    }
};

function generateInkyTarget(pacMan, blinky) {
    let inkyTarget = {
        row: (pacMan.row + 2 * + Math.round(Math.cos(pacMan.dir * Math.PI / 2)) + 31) % 31,
        column: ( pacMan.column + 2 * + Math.round(Math.sin(pacMan.dir * Math.PI / 2)) + 28) % 28
    };
    let drow = inkyTarget.row - blinky.row;
    let dcol = inkyTarget.column - blinky.column;
    return {
        row: (inkyTarget.row + 2 * drow + 310) % 31,
        column: (inkyTarget.column + 2 * dcol + 280) % 28,
    };
}

function generatePinkyTarget(pacMan) {
    return {
        row: (pacMan.row + 4 * + Math.round(Math.cos(pacMan.dir * Math.PI / 2)) + 31) % 31,
            column: ( pacMan.column + 4 * + Math.round(Math.sin(pacMan.dir * Math.PI / 2)) + 28) % 28
    };
}

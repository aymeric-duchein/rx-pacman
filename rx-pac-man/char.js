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
    move: function(frameCount) {
        if (!this.matrix[this.row + Math.round(Math.cos(this.dir * Math.PI / 2))][this.column + Math.round(Math.sin(this.dir * Math.PI / 2))] && frameCount === 0) {
            this.moving = true;
            this.posX += this.velocity * Math.sin(this.dir * Math.PI / 2);
            this.posY += this.velocity * Math.cos(this.dir * Math.PI / 2);
        }
        if (frameCount && this.moving) {
            this.posX += this.velocity * Math.sin(this.dir * Math.PI / 2);
            this.posY += this.velocity * Math.cos(this.dir * Math.PI / 2);
        }
        if (frameCount === 3 && this.moving) {
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
        rect(this.posX - 5, this.posY - 5, 10, 10);
    },
    setDir: function(dir) {
        this.dir = dir;
    }
};
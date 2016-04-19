var CELLTYPE = {
    WALL: 0, AIR: 1, DOOR: 2
};

function World(){

    var cells = [];

    const width = 16;
    const height = 15;

    this.init = function (){
        for(var i = 0; i < width; i++) {
            cells[i] = [];
            for(var j = 0; j < height; j++) {
                var type = CELLTYPE.AIR;
                if(i === 0 || j === 0 || i === width - 1 || j == height - 1){
                    type = CELLTYPE.WALL;
                }else if(i === 7 && j === 7){
                    type = CELLTYPE.WALL;
                }
                cells[i][j] = new Cell(i, j, type);
            }
        }
        this.createDoor();
    };

    this.collideWithDoor = function (player){
        return Boolean(player.bounds.collideWith(door.cell.bounds));
    }

    this.createDoor = function () {
        var c = this.spawnCell();
        var cellDoor = new Cell(c.position.x, c.position.y, CELLTYPE.DOOR);
        door = new Door(c);
        cellDoor.setDoor(door);
        cells[c.position.x][c.position.y] = cellDoor;
        delete c;
    }

    this.getCells = function (xReal, yReal){


        var x = parseInt((width * xReal) / (Cell.SIZE * width));
        var y = parseInt((height * yReal) / (Cell.SIZE * height));

        const surround = 2;

        var cellsTmp = [];

        for(var i = x; i < x + surround; i++){
            for(var j = y; j < y + surround; j++){
                var c = this.getCell(i, j);
                if(c === 'undefined' || c == null) {
                    continue;
                }
                cellsTmp.push(c);
            }
        }
        return cellsTmp;
    };

    this.getCellsReal = function(xReal, yReal){
        var x = parseInt((width * xReal) / (Cell.SIZE * width));
        var y = parseInt((height * yReal) / (Cell.SIZE * height));
        return this.getCell(x, y);
    }

    this.getCell = function(x, y) {
        var c;
        if (x >= 0 && y >= 0 && x < width && y < height){
            c = cells[x][y];
        }
        return c;
    };

    this.collide = function(player) {

        var nextP = new Vector2(player.position.x, player.position.y);
        nextP.x += player.velocity.x;
        nextP.y += player.velocity.y;

        var cells = this.getCells(nextP.x, nextP.y);

        for(var i = 0; i < cells.length; i++) {

            var nextC = cells[i];

            if (nextC === 'undefined' || nextC == null) {
                console.error("undefinied || null");
                continue;
            };

            if (nextC.type === CELLTYPE.WALL) {
                if (Boolean(player.bounds.collideWith(nextC.bounds))) {
                    return true;
                }
            }

        }

        return false;

    };

    this.openDoor = function () {
        door.activateDoor();
    }

    this.spawnCell = function () {

        var nextC;

        var happy = false;

        do{
            var xxx = (Math.random() * canvas.width);
            var yyy = (Math.random() * canvas.height);

            var x = parseInt((canvas.width * xxx) / (Cell.SIZE * canvas.width));
            var y = parseInt((canvas.height * yyy) / (Cell.SIZE * canvas.height));

            nextC = this.getCell(x, y);
            if (nextC === 'undefined' || nextC == null) {
                continue;
            }
            if (nextC.type === CELLTYPE.AIR) {
                happy = true;
            }

        }while(!Boolean(happy));

        return nextC;
    };

    this.update = function (delta){

    };

    this.render = function (){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].render();
            }
        }
    };

    this.debug = function (){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].debug();
            }
        }
    };

    this.debugCoord = function(){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].text();
            }
        }
    }

    function Door(c){

        this.active = 0;
        this.cell = c;

        this.activateDoor = function (){
            this.active = 1;
        }

    }

}

Cell.SIZE = 32;
function Cell(x, y, t){

    this.position = new Vector2(x, y);

    this.bounds = new Bound(x * Cell.SIZE, y * Cell.SIZE, Cell.SIZE, Cell.SIZE);

    this.type = t;

    this.render = function(){
        var x = this.position.x * Cell.SIZE;
        var y = this.position.y * Cell.SIZE;
        if (this.type === CELLTYPE.WALL) {
            s_world_block.draw(x, y);
        }else if (this.type === CELLTYPE.AIR) {
            s_world_air.draw(x, y);
        }else if (this.type === CELLTYPE.DOOR) {
            s_door[this.door.active].draw(x, y);
        }
    };

    this.setDoor = function (d){
        this.door = d;
    }

    this.debug = function () {
        if (this.type === CELLTYPE.WALL) {
            ctx.fillStyle = "black";
            this.bounds.debug();
        }else if (this.type === CELLTYPE.AIR) {
            ctx.beginPath();
            ctx.rect(this.bounds.x, this.bounds.y, Cell.SIZE,Cell.SIZE);
            ctx.stroke();
        }else if (this.type === CELLTYPE.DOOR) {
            ctx.fillStyle = "blue";
            this.bounds.debug();
        }
    };

    this.text = function(){
        var text = "[" +  this.position.x +"-"+this.position.y +"]";
        ctx.fillText(text, this.position.x * Cell.SIZE, this.position.y * Cell.SIZE);
    };

}


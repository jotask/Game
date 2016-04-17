var CELLTYPE = {
    WALL: 0, AIR: 1
};

function World(){

    var worldReady = false;
    var worldImage = new Image();
    worldImage.onload = function () {
        worldReady = true;
    };
    worldImage.src = "img/background.png";

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
    };

    this.collide = function(player){
        var xPlayer = player.x;
        var yPlayer = player.y;

        var indexX = xPlayer;
        var indexY = yPlayer;

        var indexX = parseInt(indexX);
        var indexY = parseInt(indexY);

        console.log(indexX, indexY);

        // var c = cells[indexY][indexX];

        // console.log(indexX, indexY);

        // if(cells[indexX] && cells[indexX][0]){
        //     console.log(indexX);
        // }

        // console.log(c.type);

        // if(c.type === CELLTYPE.WALL){
        //     console.log(indexX, indexY);
        // }

        return false;

    }

    this.update = function (delta){

    };

    this.render = function (ctx){
        if(worldReady && !Boolean(debug))
            ctx.drawImage(worldImage, 0, 0);
    };

    this.debug = function (ctx){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].debug(ctx);
            }
        }
    };

    this.debugCoord = function(ctx){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].text(ctx);
            }
        }
    }

}

Cell.SIZE = 32;
function Cell(x, y, t){

    var x = x;
    var y = y;

    this.type = t;

    this.debug = function (ctx) {

        if (this.type === CELLTYPE.WALL) {
            ctx.fillRect(x * Cell.SIZE, y * Cell.SIZE, Cell.SIZE, Cell.SIZE);
        }else if (this.type === CELLTYPE.AIR) {
            ctx.beginPath();
            ctx.rect(x * Cell.SIZE, y * Cell.SIZE, Cell.SIZE,Cell.SIZE);
            ctx.stroke();
        }
        // console.error("world.cell.debug");
    };

    this.text = function(ctx){
        var text = "[" +  x +"-"+y +"]";
        ctx.fillText(text, x * Cell.SIZE, y * Cell.SIZE);
    }

}
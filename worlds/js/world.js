var CELLTYPE = {
    WALL: 0,
    AIR: 1
};

function World(){

    var worldReady = false;
    var worldImage = new Image();
    worldImage.onload = function () {
        worldReady = true;
    };
    worldImage.src = "img/background.png";

    var cells = [];

    var width = 16;
    var height = 15;

    this.init = function (){
        for(var i = 0; i < width; i++) {
            cells[i] = [];
            for(var j = 0; j < height; j++) {
                var type = CELLTYPE.AIR;

                if(i === 0 || j === 0 || i === width - 1 || j == height - 1){
                    type = CELLTYPE.WALL;
                }

                cells[i][j] = new Cell(i, j, type);
            }
        }
    };

    this.update = function (delta){

    };

    this.render = function (ctx){
        if(worldReady)
            ctx.drawImage(worldImage, 0, 0);
    };

    this.debug = function (ctx){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].debug(ctx);
            }
        }
    };

}
function Cell(x, y, t){

    var size = 32;

    var x = x * size;
    var y = y * size;

    var type = t;

    this.debug = function (ctx) {
        // ctx.beginPath();
        // ctx.lineWidth = "1";
        if (type === CELLTYPE.WALL) {
            ctx.fillRect(x, y, size, size);
        }
        // if (type === CELLTYPE.AIR) {
        //     ctx.strokeStyle = "cyan";
        //     ctx.fillStyle = "cyan";
        // }
        // ctx.fill();
    };

}
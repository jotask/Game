var CELLTYPE = {
    WALL: 0, AIR: 1
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
    };

    this.getCell = function(x, y) {
        var x = parseInt((width * x) / (Cell.SIZE * width));
        var y = parseInt((height * y) / (Cell.SIZE * height));
        var c;
        if (x >= 0 && y >= 0 && x < width && y < height){
            c = cells[x][y];
        }
        return c;
    };

    this.collide = function(player){

        var nextP = new Vector2(player.position.x, player.position.y);
        nextP.x += player.velocity.x;
        nextP.y += player.velocity.y;

        var nextC = this.getCell(nextP.x, nextP.y);

        if(nextC === 'undefined'){
            if(player.bounds.collideWith(nextC.bounds)){
                console.log("collide");
            }
        }

        return false;

    };

    this.update = function (delta){

    };

    this.render = function (ctx){
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                cells[i][j].render({parameters: {parameters: {parameters: {ctx: ctx}}}});
            }
        }
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

    this.position = new Vector2(x, y);

    this.bounds = new Bound(x, y, Cell.SIZE, Cell.SIZE);

    this.type = t;

    this.render = function(){
        var x = this.position.x * Cell.SIZE;
        var y = this.position.y * Cell.SIZE;
        if (this.type === CELLTYPE.WALL) {
            s_world_block.draw(x, y);
            // ctx.drawImage(s_world_block.img, x, y);
        }else if (this.type === CELLTYPE.AIR) {
            s_world_air.draw(x, y);
        }
    };

    this.debug = function (ctx) {

        if (this.type === CELLTYPE.WALL) {
            ctx.fillStyle = "black";
            ctx.fillRect(this.position.x * Cell.SIZE, this.position.y * Cell.SIZE, Cell.SIZE, Cell.SIZE);
        }else if (this.type === CELLTYPE.AIR) {
            ctx.beginPath();
            ctx.rect(this.position.x * Cell.SIZE, this.position.y * Cell.SIZE, Cell.SIZE,Cell.SIZE);
            ctx.stroke();
        }
        // console.error("world.cell.debug");
    };

    this.text = function(ctx){
        var text = "[" +  this.position.x +"-"+this.position.y +"]";
        ctx.fillText(text, this.position.x * Cell.SIZE, this.position.y * Cell.SIZE);
    };

}


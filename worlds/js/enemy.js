function Enemy(){

    var enemyReady = false;
    var enemyImage = new Image();
    enemyImage.onload = function () {
        enemyReady = true;
    };
    enemyImage.src = "img/monster.png";

    var size = 32;

    var x = 0;
    var y = 0;

    var bounds = new Bound(x, y, size, size);

    this.init = function (){

    };

    this.setPosition = function (xx, yy){
        x = xx;
        y = yy;
        bounds.x = xx;
        bounds.y = yy;
        console.log("Position:");
        console.log(x, y);
        console.log("Bounds:");
        console.log(bounds.x, bounds.y);
    };

    this.update = function (delta){
        bounds.setPosition(x, y);
    };

    this.render = function (ctx){
        if(enemyReady)
            ctx.drawImage(enemyImage, x, y);
    };

    this.debug = function (ctx){
        bounds.debug(ctx);
    }

}
function Enemy(){

    var enemyReady = false;
    var enemyImage = new Image();
    enemyImage.onload = function () {
        enemyReady = true;
    };
    enemyImage.src = "img/monster.png";

    var size = 32;

    this.x = 0;
    this.y = 0;

    this.bounds = new Bound(this.x, this.y, size, size);

    this.init = function (){

    };

    this.setPosition = function (xx, yy){
        this.x = xx;
        this.y = yy;
        this.bounds.x = xx;
        this.bounds.y = yy;
    };

    this.update = function (delta){
        this.bounds.setPosition(this.x, this.y);
    };

    this.render = function (ctx){
        if(enemyReady)
            ctx.drawImage(enemyImage, this.x, this.y);
    };

    this.debug = function (ctx){
        this.bounds.debug(ctx);
    };

}
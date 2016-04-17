function Player(){

    var imgReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        imgReady = true;
    };
    heroImage.src = "img/hero.png";

    var speed = 250;

    var size = 32;

    var x = 0;
    var y = 0;

    var bounds = new Bound(x, y, size, size);

    this.init = function (){};

    this.setPosition = function (xx, yy){
        x = xx;
        y = yy;
        bounds.x = xx;
        bounds.y = yy;
    };

    this.update = function (delta){
        if(87 in keysDown || 38 in keysDown){
            y -= speed * delta;
        }
        if(83 in keysDown || 40 in keysDown){
            y += speed * delta;
        }
        if(65 in keysDown || 37 in keysDown){
            x -= speed * delta;
        }
        if(68 in keysDown || 39 in keysDown){
            x += speed * delta;
        }
        bounds.setPosition(x, y);
    };

    this.render = function (ctx){
        if(imgReady)
            ctx.drawImage(heroImage, x, y);
    };

    this.debug = function (ctx){
        bounds.debug(ctx);
    };

}
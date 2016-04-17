function Player(){

    var imgReady = false;
    var heroImage = new Image();
    heroImage.onload = function () {
        imgReady = true;
    };
    heroImage.src = "img/hero.png";

    var speed = 250;

    var size = 32;

    this.x = 0;
    this.y = 0;

    this.bounds = new Bound(this.x, this.y, size, size);

    this.init = function (){};

    this.setPosition = function (xx, yy){
        this.x = xx;
        this.y = yy;
        this.bounds.x = xx;
        this.bounds.y = yy;
    };

    this.update = function (delta){
        if(87 in keysDown || 38 in keysDown){
            this.y -= speed * delta;
        }
        if(83 in keysDown || 40 in keysDown){
            this.y += speed * delta;
        }
        if(65 in keysDown || 37 in keysDown){
            this.x -= speed * delta;
        }
        if(68 in keysDown || 39 in keysDown){
            this.x += speed * delta;
        }
        this.bounds.setPosition(this.x, this.y);
    };

    this.collide = function(other){

        return Boolean(this.bounds.x <= (other.x + other.width)
        && other.x <= (this.bounds.x + this.bounds.width)
        && this.bounds.y <= (other.y + other.height)
        && other.y <= (this.bounds.y + this.bounds.height));
    };

    this.render = function (ctx){
        if(imgReady)
            ctx.drawImage(heroImage, this.x, this.y);
    };

    this.debug = function (ctx){
        this.bounds.debug(ctx);
    };

}
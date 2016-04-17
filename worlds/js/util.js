function Vector2(x, y){
    this.x = x;
    this.y = y;

    this.reset = function(){
        this.x = 0;
        this.y = 0;
    };

    this.isZero = function(){
        return Boolean((this.x === 0) && (this.y === 0));
    }

}

function Bound(xP, yP, width, height){

    this.x = xP;
    this.y = yP;
    this.width = width;
    this.height = height;

    this.setPosition = function (xx, yy){
        this.x = xx;
        this.y = yy;
    };

    this.debug = function(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.collideWith = function(other){
        if(other == null)
            return;

        return Boolean(this.x <= (other.x + other.width)
        && other.x <= (this.x + width)
        && this.y <= (other.y + other.height)
        && other.y <= (this.y + height));
    };

}
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

        var one = Boolean(this.x < (other.x + other.width));
        var two = Boolean((this.x + this.width) > other.x);
        var three = Boolean(this.y < (other.y + other.height));
        var four = Boolean((this.y + this.height) > other.y);

        var bool = Boolean(one && two && three && four);

        // console.log(one, two, three, four);

        return bool;

        // return Boolean(this.x <= (other.x + other.width)
        // && other.x <= (this.x + this.width)
        // && this.y <= (other.y + other.height)
        // && other.y <= (this.y + this.height));
        //
    };

}
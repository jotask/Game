function Vector2(x, y){

    this.x = x;
    this.y = y;

    this.reset = function(){
        this.x = 0;
        this.y = 0;
    };

    this.isZero = function(){
        return Boolean((this.x === 0) && (this.y === 0));
    };

    this.dispose = function(){
        delete this.x;
        delete this.y;
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

        return Boolean(one && two && three && four);

    };

}

function Button(s, x, y){

    var sprite = s;
    var position = new Vector2(x, y);

    var bounds = new Bound(x, y, sprite.width / 2, sprite.height / 2);

    this.onClick = function (e) {
        var rect = canvas.getBoundingClientRect();
        return Boolean(collide(e.clientX - rect.left, e.clientY - rect.top));
    };

    this.update = function (delta) {

    };

    this.render = function(){
        sprite.draw(position.x, position.y);
    };

    this.debug = function (){
        bounds.debug();
    };

    var collide = function (mouseX, mouseY){
        if(((mouseX > bounds.x) && (mouseX < (bounds.x + bounds.width)))&&((mouseY > bounds.y) && (mouseY < (bounds.y + bounds.height)))){
            return true;
        }
        return false;
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isNull(object){
    return Boolean(object === 'undefined' || object == null);
}
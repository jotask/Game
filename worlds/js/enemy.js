function Enemy(){

    const animationSpeed = 7;
    const size = 32;

    var frame = 0;
    const animation = [0,1];

    this.position = new Vector2(200,360);

    this.bounds = new Bound(this.x, this.y, size, size);

    this.init = function (){

    };

    this.setPosition = function (xx, yy){
        this.position.x = xx;
        this.position.y = yy;
        this.bounds.x = xx;
        this.bounds.y = yy;
    };

    this.update = function (delta){
        this.bounds.setPosition(this.position.x, this.position.y);
        updateAnimation();
    };

    var updateAnimation = function(){
        frame += frames % animationSpeed === 0 ? 1 : 0;
        frame %= animation.length;
    };

    this.render = function (){
        s_monster[frame].draw(this.position.x, this.position.y);
    };

    this.debug = function (){
        ctx.fillStyle = "red";
        this.bounds.debug();
    };

}
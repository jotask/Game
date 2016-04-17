function Enemy(){

    var size = 32;

    this.position = new Vector2(0,0);

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
    };

    this.render = function (ctx){
        s_monster.draw(ctx, this.position.x, this.position.y);
    };

    this.debug = function (ctx){
        this.bounds.debug(ctx);
    };

}
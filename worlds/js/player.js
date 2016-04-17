function Player(){

    const animationSpeed = 7;
    const speed = 250;

    var frame = 0;
    var animation = [0,1];

    var size = 32;

    this.position = new Vector2(0,0);
    this.velocity = new Vector2(0,0);

    this.bounds = new Bound(this.x, this.y, size, size);

    this.init = function (){};

    this.setPosition = function (xx, yy){
        this.position.x = xx;
        this.position.y = yy;
        this.bounds.x = xx;
        this.bounds.y = yy;
    };

    this.update = function (delta){

        this.velocity.reset();

        // handle input
        if(87 in keysDown || 38 in keysDown){
                this.velocity.y -= speed * delta;
        }
        if(83 in keysDown || 40 in keysDown){
            this.velocity.y += speed * delta;
        }
        if(65 in keysDown || 37 in keysDown){
            this.velocity.x -= speed * delta;
        }
        if(68 in keysDown || 39 in keysDown){
            this.velocity.x += speed * delta;
        }

        if(!world.collide(player)) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        if(!Boolean(this.velocity.isZero())){
            updateAnimation();
        }

        // handle update
        this.bounds.setPosition(this.position.x, this.position.y);
    };

    var updateAnimation = function(){
        frame += frames % animationSpeed === 0 ? 1 : 0;
        frame %= animation.length;
    }

    this.collide = function(other){

        return Boolean(this.bounds.x <= (other.x + other.width)
        && other.x <= (this.bounds.x + this.bounds.width)
        && this.bounds.y <= (other.y + other.height)
        && other.y <= (this.bounds.y + this.bounds.height));
    };

    this.render = function (ctx){
        s_player[frame].draw(ctx, this.position.x, this.position.y);
    };

    this.debug = function (ctx){
        this.bounds.debug(ctx);
    };

}
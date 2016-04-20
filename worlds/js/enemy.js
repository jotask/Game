function Enemy(anim){

    const size = 32;

    var frame = 0;
    this.animation = anim;

    this.position = new Vector2(0,0);

    this.bounds = new Bound(this.position.x, this.position.y, size, size);

    this.init = function (){

    };

    this.setPosition = function (xx, yy){
        this.position.x = xx;
        this.position.y = yy;
        this.bounds.x = xx;
        this.bounds.y = yy;
    };

    this.randomUpdate = function(){

    };

    this.update = function (){
        this.bounds.setPosition(this.position.x, this.position.y);
        this.updateAnimation();
    };

    // FIXME fixanimations
    this.updateAnimation = function(){
        var n = 10;
        frame += frames % n === 0 ? 1: 0;
        frame %= this.animation.length;
    };

    this.getFrame = function(){
        return frame;
    };

    this.render = function (){

    };

    this.debug = function (){
        ctx.fillStyle = "red";
        this.bounds.debug();
    };

    this.getBounds = function(){
        return this.bounds;
    };

    this.setBounds = function (width, height) {
        this.bounds.width = width;
        this.bounds.height = height;
    }

}

function Spider(){

    var enemy = new Enemy([0,1]);

    var move = new RandomMovement(enemy, 4);

    this.init = function (){
        enemy.init();
        enemy.setBounds(32,16);
    };

    this.randomUpdate = function(){
        move.randomUpdate();
    };

    this.setPosition = function (xx, yy){
        enemy.setPosition(xx,yy);
    };

    this.update = function (delta){
        enemy.update(delta, this);
        move.update(enemy);
    };

    this.render = function (){
        s_spider[enemy.getFrame()].draw(enemy.position.x, enemy.position.y);
    };

    this.debug = function (){
        ctx.fillStyle = "yellow";
        this.getBounds().debug();
    };

    this.getBounds = function(){
        return enemy.getBounds();
    }
}

function RandomMovement(entity, s){

    const speed = s;

    var world = gsm.getState().world;

    var position = entity.position;

    var velocity = new Vector2(0,0);

    this.randomUpdate = function(){
        velocity = randomDirection();
    };

    var randomDirection = function(){

        var direction = new Vector2(0,0);

        var random = getRandomInt(0,4);

        switch (random){
            case 3:
                direction.x += speed;
                break;
            case 2:
                direction.x -= speed;
                break;
            case 1:
                direction.y += speed;
                break;
            case 0:
                direction.y -= speed;
                break;
            default:
                console.error(random);
                break;
        }

        // Check if position is valid
        var cells = world.getCells(position.x + velocity.x, position.y + velocity.y);
        for(var i = 0; i < cells.length; i++) {
            var nextCell = cells[i];
            if (!isNull(nextCell) && nextCell.type === CELLTYPE.WALL) {
                direction = test();
            }
        }
        return direction;
    };

    var test = function(){
        // FIXME avoid when collide and stop move
        return new Vector2(0,0);
    };

    this.update = function (){
        if(!velocity.isZero()) {
            position.x += velocity.x;
            position.y += velocity.y;
        }
    };

}

function Zombie(){

    var enemy = new Enemy([0,1]);

    var move = new RandomMovement(enemy, 1);

    this.init = function (){
        enemy.init();
    };

    this.randomUpdate = function(){
        // FIXME
        move.randomUpdate();
    };

    this.setPosition = function (xx, yy){
        enemy.setPosition(xx,yy);
    };

    this.update = function (delta){
        enemy.update(delta);
        move.update();
    };

    this.render = function (){
        s_zombie[enemy.getFrame()].draw(enemy.position.x, enemy.position.y);
    };

    this.debug = function (){
        ctx.fillStyle = "red";
        enemy.bounds.debug();
    };

    this.getBounds = function(){
        return enemy.getBounds();
    }

}
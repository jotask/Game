//noinspection BadExpressionStatementJS
function Player(){

    const animationSpeed = 7;
    const speed = 250;
    const size = 32;

    var attack;

    var health = 100;

    var frame = 0;
    const animation = [0,1];

    const offset = 7;

    this.init = function (){

        this.position = new Vector2(0, 0);
        this.velocity = new Vector2(0,0);

        this.bounds = new Bound(this.position.x, this.position.y, size - offset*2, size - offset*2);

        attack = new SwordAttack(this);

    };

    this.setPosition = function (xx, yy){
        this.position.x = xx;
        this.position.y = yy;
        this.bounds.x = xx - offset;
        this.bounds.y = yy - offset;
    };

    this.onClick = function (){
        attack.attack();
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

        var world = gsm.getState().world;

        if(!Boolean(world.collide(this))) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
        }

        if(!Boolean(this.velocity.isZero())){
            updateAnimation();
        }

        // handle update
        this.bounds.setPosition(this.position.x + offset, this.position.y + offset);

        attack.update();

    };

    var updateAnimation = function(){
        frame += frames % animationSpeed === 0 ? 1 : 0;
        frame %= animation.length;
    };

    this.render = function (){
        s_player[frame].draw(this.position.x, this.position.y);
    };

    this.debug = function (){
        ctx.fillStyle = "cyan";
        this.bounds.debug();
        attack.debug();
    };

    this.hit = function (damage) {
        health -= damage;
    }

    this.getHealth = function(){
        return health;
    }

}

function SwordAttack(jugador){

    const player = jugador;

    var currentAttackTime;

    var sword = {
        position: new Vector2(0,0),
        attackTime: 10,
        width: 16,
        height: 100,
        visible: false
    };

    this.update = function () {
        var p = player.position;
        sword.position.x = p.x;
        sword.position.y = p.y;
        if(sword.visible){
            currentAttackTime += 1;
            if(currentAttackTime >= sword.attackTime){
                sword.visible = false;
                console.log("done");
            }
        }else{

        }
    };

    this.attack = function (){
        var p = player.position;
        sword.position.x = p.x;
        sword.position.y = p.y;
        sword.visible = true;
        currentAttackTime = 0;
    };

    this.debug = function () {
        if(sword.visible){
            ctx.fillRect(sword.position.x, sword.position.y, sword.width, sword.height);
            // console.log("visible");
        }
    }

}
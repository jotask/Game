
//Canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var debug = true;

var world;
var player;
var monster;
var gui;

var monsterCaught = 0;
var frames = 0;

// Handle Input
var keysDown = {};

addEventListener("keydown", function(e){
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
    delete keysDown[e.keyCode];
}, false);

// New Game
var reset = function(){
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    player.setPosition(x, y);

    var xxx = 32 + (Math.random() * (canvas.width - 64));
    var yyy = 32 + (Math.random() * (canvas.height - 64));
    monster.setPosition(xxx, yyy);
};

// Update game object

// Main Game Loop

var load = function(){

    var spriteSheetReady = false;
    var spriteSheet = new Image();
    spriteSheet.onload = function(){
        initSprites(this);
        spriteSheetReady = true;
        run();
    }
    spriteSheet.src = "img/sprite.png";

}

var run = function(){

    world = new World();
    world.init();
    player = new Player();
    monster = new Enemy();
    gui = new Gui();

    reset();

    loop();
};

var loop = function(){
    var now = Date.now();
    var delta = now - then;

    update (delta / 1000);
    render();
    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(loop);
};

var update = function(delta){

    if(81 in keysDown){
        debug = !debug;
    }

    frames++;

    world.update(delta);
    player.update(delta);
    monster.update(delta);
    gui.update(delta);

    // checkCollisions();

};

var checkCollisions = function(){
    // Touch World
    if (Boolean(world.collide(player))) {
        console.log("collision.world");
    }
    // Touch Enemies
    if (Boolean(player.collide(monster.bounds))) {
        // console.log("collision.enemy");
    }

};

var render = function(){

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    world.render(ctx);
    monster.render(ctx);
    player.render(ctx);
    gui.render(ctx);

    if(Boolean(debug)){
        debugRender();
    }
};

var debugRender = function(){

    ctx.fillStyle = "red";
    ctx.strokeStyle="green";
    ctx.lineWidth="1";
    ctx.font = "10px Arial";
    ctx.fontcolor = "orange";

    ctx.globalAlpha = 1;
    world.debug(ctx);
    player.debug(ctx);
    monster.debug(ctx);
    gui.debug(ctx);
    ctx.fillStyle = "blue";
    // world.debugCoord(ctx);
    ctx.globalAlpha = 1;
};

var then = Date.now();
load();
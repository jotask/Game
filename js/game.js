
const firstState = states.Splash;
const WIDTH = 512;
const HEIGHT = 480;
var debug = false;
var mute = false;

var canvas;
var ctx;

var gsm;

var frames = 0;

// Handle Input
var keysDown = {};

var load = function(){
    var spriteSheet = new Image();
    spriteSheet.onload = function(){
        initSprites(this);
        run();
    };
    spriteSheet.src = "img/sprite.png";
};

var run = function(){

    //Canvas
    canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    // document.body.appendChild(canvas);
    document.getElementById("canvas").appendChild(canvas);

    addListeners();

    gsm = new GameStateManager();
    gsm.changeState(firstState);

    loop();

    gsm.dispose();
};

// follow code is based on the followin link
// Looks the same but is no copied, is based on this
//https://github.com/lostdecade/simple_canvas_game/blob/master/js/game.js
var addListeners = function(){

    addEventListener("keydown", function(e){ keysDown[e.keyCode] = true; }, false);
    addEventListener("keyup", function(e){ delete keysDown[e.keyCode]; }, false);

    var evt = "touchstart";
    if(WIDTH >= 500){
        evt = "mousedown";
    }
    addEventListener(evt, function(e){gsm.onClick(e)}, false);
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
    // if(81 in keysDown)
    //     debug = !debug;
    frames++;
    gsm.update(delta);
};

var render = function(){
    // clear screen
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0,0,canvas.width, canvas.height);

    gsm.render(ctx);
    if(Boolean(debug))
        gsm.debug(ctx);
};

var then = Date.now();

var muteSound = function(){
    var element = document.getElementById("mute");
    if(mute){
        element.innerText = "Disable Sounds";
        mute = !mute;
    }else{
        element.innerText = "Enable Sounds";
        mute = !mute;
    }
};
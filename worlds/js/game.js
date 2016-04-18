
const firstState = states.Play;
const WIDTH = 512;
const HEIGHT = 480;
var debug = true;

var canvas;
var ctx;

var gsm;

var frames = 0;

// Handle Input
var keysDown = {};

var load = function(){
    var spriteSheetReady = false;
    var spriteSheet = new Image();
    spriteSheet.onload = function(){
        initSprites(this);
        spriteSheetReady = true;
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
    document.body.appendChild(canvas);

    addListeners();

    gsm = new GameStateManager();
    gsm.changeState(firstState);

    loop();
};

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
    if(81 in keysDown)
        debug = !debug;
    frames++;
    gsm.update(delta);
};

var render = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gsm.render(ctx);
    if(Boolean(debug))
        gsm.debug(ctx);
};

function getMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var then = Date.now();

load();
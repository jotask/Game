const states = {
    Splash: 0,
    Menu: 1,
    Play: 2
};

function GameStateManager(){

    var currentState;

    this.changeState = function (s){

        if(currentState != null)
            currentState.dispose();

        switch (s){
            default:
            case states.Splash:
                currentState = new Splash();
                currentState.init();
                break;
            case states.Menu:
                currentState = new Menu();
                currentState.init();
                break;
            case states.Play:
                currentState = new Play();
                currentState.init();
                break;
        }
    };

    this.onClick = function (e){
        currentState.onClick(e);
    };

    this.update = function(delta){
        currentState.update(delta)
    };

    this.render = function (){
        currentState.render();
    };

    this.debug = function (){
        currentState.debug();
    };

    this.dispose = function (){
        currentState.dispose();
    };

    this.getState = function(){
        return currentState;
    }

}

function Splash(){

    var position;

    this.init = function () {
        position = new Vector2(WIDTH / 2, HEIGHT / 2);
    };

    this.onClick = function (e){
        gsm.changeState(states.Menu);
    };

    this.update = function(delta){
        var tmp = getMousePos(canvas);
    };

    this.render = function (){
        ctx.save();
        ctx.scale(1,1);
        s_splash.draw(ctx, position.x, position.y);
        ctx.restore();
    };

    this.debug = function (){

    };

    this.dispose = function (){

    };

}

function Menu(){

    this.init = function () {

    };

    this.onClick = function (e){
        gsm.changeState(states.Play);
    };

    this.update = function(delta){

    };

    this.render = function (){

    };

    this.debug = function (){

    };

    this.dispose = function (){

    };

}

function Play(){

    this.world;
    this.player;
    this.monster;
    this.gui;

    this.init = function () {
        this.world = new World();
        this.world.init();
        this.player = new Player();
        this.monster = new Enemy();
        this.gui = new Gui();

        reset();
    };

    this.onClick = function (e){};

    // New Game
     var reset = function(){
        var x = canvas.width / 2;
        var y = canvas.height / 2;
        // this.player.setPosition(x, y);

        var xxx = (Math.random() * canvas.width);
        var yyy = (Math.random() * canvas.height);
        // this.monster.setPosition(xxx, yyy);
    };

    this.update = function(delta){
        this.world.update(delta);
        this.player.update(delta);
        this.monster.update(delta);
        this.gui.update(delta);
    };

    this.render = function (){
        this.world.render();
        this.player.render();
        this.monster.render();
        this.gui.render();
    };

    this.debug = function (){

        ctx.fillStyle = "red";
        ctx.strokeStyle="green";
        ctx.lineWidth="1";
        ctx.font = "10px Arial";
        ctx.fontcolor = "orange";

        ctx.globalAlpha = 1;
        this.world.debug(ctx);
        this.player.debug(ctx);
        this.monster.debug(ctx);
        this.gui.debug(ctx);
        ctx.fillStyle = "blue";
        // world.debugCoord(ctx);
        ctx.globalAlpha = 1;

    };

    this.dispose = function (){

    };

    var checkCollisions = function(){
        if (Boolean(this.world.collide(this.player)))
            console.log("collision.world");
        if (Boolean(this.player.collide(monster.bounds)))
            console.log("collision.enemy");
    };

}
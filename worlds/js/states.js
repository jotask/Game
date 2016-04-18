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

    const TIME = 3;

    var position;
    var start;
    var end;

    var opacity;

    this.init = function () {
        var x = canvas.width / 2 - (s_splash.width / 2) / 2;
        var y = canvas.height / 2 - (s_splash.height / 2) / 2;
        position = new Vector2(x, y);

        start = new Date();
        end = new Date();
        end.setSeconds(end.getSeconds() + TIME);

        opacity = 1;

    };

    this.onClick = function (e){
        gsm.changeState(states.Menu);
    };

    this.update = function(delta) {
        if(end < new Date()){
            gsm.changeState(states.Menu);
        }
        opacity -= (0.0055);
    };

    this.render = function (){
        ctx.save();
        ctx.globalAlpha = opacity;
        s_splash.draw(position.x, position.y );
        ctx.globalAlpha = 1;
        ctx.restore();
    };

    this.debug = function (){

    };

    this.dispose = function (){
        position.dispose();
    };

}

function Menu(){

    var  play_button;

    this.init = function () {
        var x = canvas.width / 2 - (s_play_btn.width / 2) / 2;
        var y = canvas.height / 2 - (s_play_btn.height / 2) / 2;
        play_button = new Button(s_play_btn, x, y);
    };

    this.onClick = function (e){
        if(Boolean(play_button.onClick(e)))
            gsm.changeState(states.Play);
    };

    this.update = function(delta){

    };

    this.render = function (){
        play_button.render();
    };

    this.debug = function (){
        play_button.debug();

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2,0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0,canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
    };

    this.dispose = function (){

    };

}

function Play(){

    var level = 0;

    this.world;
    this.player;
    this.gui;
    this.manager;

    this.init = function () {
        this.world = new World();
        this.world.init();
        this.player = new Player();
        this.player.init();

        this.gui = new Gui();

        this.manager = new EntityManager(this.world);
        this.manager.init();

        this.reset();

        this.manager.addXEnemy(5);

    };

    this.onClick = function (e){};

     this.reset = function(){
         var c = this.world.spawnCell();
         this.player.setPosition(c.position.x * Cell.SIZE, c.position.y * Cell.SIZE);

         this.manager.reset(level);

    };

    this.update = function(delta){
        this.world.update(delta);
        this.player.update(delta);
        this.manager.update(delta);
        this.gui.update(delta);
    };

    this.render = function (){
        this.world.render();
        this.player.render();
        this.manager.render();
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
        this.manager.debug(ctx);
        this.gui.debug(ctx);
        ctx.fillStyle = "blue";
        // world.debugCoord(ctx);
        ctx.globalAlpha = 1;

    };

    this.dispose = function (){
        this.world.dispose();
        delete this.world;

        this.player.dispose();
        delete this.player;

        this.manager.dispose();
        delete this.manager;

        this.gui.dispose();
        delete this.gui;
    };

    function EntityManager(w){

        var world = w;

        var entities = [];

        this.init = function (){

        };

        this.addXEnemy = function (i){
            for (var j = 0; j < i; j++) {
                this.addNewEnemy();
            }
        };

        this.addNewEnemy = function (){
            var enemy = new Enemy();
            var c = world.spawnCell();
            enemy.setPosition(c.position.x * Cell.SIZE, c.position.y * Cell.SIZE);
            addEntity(enemy);
        };

        var addEntity = function (e){
            entities.push(e);
        };

        this.collides = function(player){
            for(var i = 0; i < entities.length; i++){
                if(Boolean(entities[i].collides(player))){
                    console.log("collide");
                }
            }
        }

        this.reset = function (level) {
            // TODO better delete enemies
            entities = [];
        };

        this.update = function (delta){
            for(var i = 0; i < entities.length; i++){
                entities[i].update();
            }
        };

        this.render = function (){
            for(var i = 0; i < entities.length; i++){
                entities[i].render();
            }
        };

        this.debug = function (){
            for(var i = 0; i < entities.length; i++){
                entities[i].debug();
            }
        };

        this.dispose = function (){

        }

    }

    // var checkCollisions = function(){
    //     if (Boolean(this.world.collide(this.player)))
    //         console.log("collision.world");
    //     if (Boolean(this.player.collide(monster.bounds)))
    //         console.log("collision.enemy");
    // };

}
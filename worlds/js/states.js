const states = {
    Splash: 0,
    Menu: 1,
    Play: 2,
    GameOver: 3
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
            case states.GameOver:
                currentState = new GameOver();
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
    };

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

function Play() {
    const POINTS_NEXTLEVEL = 10;
    const init_seconds = 3;

    // FIXME
    var level = 0;

    this.init = function () {
        this.world = new World();
        this.player = new Player();
        this.player.init();

        this.gui = new Gui(this);

        this.manager = new EntityManager(this.world);
        this.manager.init();

        this.score = new Score();

        this.reset();

    };

    this.onClick = function (e) {
        this.player.onClick(e);
    };

    this.reset = function () {

        this.world.reset(level);

        var c = this.world.spawnCell();
        this.player.setPosition(c.position.x * Cell.SIZE, c.position.y * Cell.SIZE);

        this.manager.reset(level);

        this.manager.addXEnemy(level);

        this.timer = new Time();
        this.timer.startTimer(init_seconds + (level));

    };

    this.update = function (delta) {
        this.world.update(delta);
        this.player.update(delta);
        this.manager.update(delta);

        this.manager.collides(this.player);

        if (this.manager.isEmpty()) {
            this.world.activateDoor();
            if (this.world.collideWithDoor(this.player)) {
                this.score.addScore(POINTS_NEXTLEVEL);
                this.nextLevel();
            }
        }

        this.gui.update(delta);

        if(this.timer.isFinished()){
            gsm.changeState(states.GameOver);
        }

    };

    this.nextLevel = function () {
        document.getElementById("audio_next_level").play();
        level++;
        this.score.saveScore();
        this.reset();
    };

    this.render = function () {
        this.world.render();
        this.manager.render();
        this.player.render();
        this.gui.render();
    };

    this.debug = function () {

        ctx.fillStyle = "red";
        ctx.strokeStyle = "green";
        ctx.lineWidth = "1";
        ctx.font = "10px Arial";
        ctx.fontcolor = "orange";

        ctx.globalAlpha = 0.5;
        this.world.debug(ctx);
        this.manager.debug(ctx);
        this.player.debug(ctx);
        this.gui.debug(ctx);
        ctx.globalAlpha = 1;

    };

    this.dispose = function () {
        this.world.dispose();
        delete this.world;

        this.player.dispose();
        delete this.player;

        this.manager.dispose();
        delete this.manager;

        this.gui.dispose();
        delete this.gui;

        this.score.saveAll();
        this.score.dispose();
        delete this.score;
    };
}

function GameOver(){

    var score;

    var play;
    var menu;

    this.init = function () {
        score = new Score();
        score.loadAll();

        var offsetX = 100;
        var offsetY = 350;

        play = new Button(s_play_btn, offsetX , offsetY);
        menu = new Button(s_menu_btn, canvas.width - offsetX - (s_menu_btn.width / 2) ,offsetY);
    };

    this.onClick = function (e){
        if(play.onClick(e))
            gsm.changeState(states.Play);
        if(menu.onClick(e))
            gsm.changeState(states.Menu);
    };

    this.update = function() {

    };

    this.render = function (){
        ctx.fillStyle = 'red';
        ctx.font = '70pt Calibri';
        ctx.fillText('GameOver!', canvas.width / 2 - (220), canvas.height / 2 - (100));
        ctx.fillStyle = 'white';
        ctx.font = '40pt Calibri';
        ctx.fillText('Your Score is: ' + score.getScore(), canvas.width / 2 - (170), canvas.height / 2 - (30));
        ctx.fillText('HighScore: ' + score.getBests(), canvas.width / 2 - (130), canvas.height / 2 - (-50));
        // ctx.fillText('Hello!', canvas.width / 2 - (50), canvas.height / 2 - (100));

        menu.render();
        play.render();
    };

    this.debug = function (){
        menu.debug();
        play.debug();
    };

    this.dispose = function (){

    };

}
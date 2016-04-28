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

    const TIME = 2;

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

    this.onClick = function (){
        gsm.changeState(states.Menu);
    };

    this.update = function() {
        if(end < new Date()){
            gsm.changeState(states.Menu);
        }
        opacity -= (0.0055);
    };

    this.render = function (){
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.scale(8,8);
        s_splash.draw(15, 10);
        ctx.scale(1,1);
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
        play_button = new Button(s_play_btn, x, y + 70);
    };

    this.onClick = function (e){
        if(Boolean(play_button.onClick(e)))
            gsm.changeState(states.Play);
    };

    this.update = function(delta){

    };

    this.render = function (){
        ctx.save();
        ctx.scale(2,2);
        s_logo.draw(40,10);
        ctx.restore();
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

    var level = 0;

    this.init = function () {
        this.world = new World();
        this.player = new Player();
        this.player.init();

        this.gui = new Gui(this);

        this.entityManager = new EntityManager(this.world);
        this.entityManager.init();

        this.bombManager = new WeaponManager();
        this.bombManager.init();

        this.score = new Score();

        this.reset();

    };

    this.onClick = function (e) {
        this.player.onClick(e);

        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        // Check if click is inside canvas
        var tmp = ((x > 0 && x < canvas.width) && (y > 0 && y < canvas.height));

        if(tmp)
            this.bombManager.newBomb(this.player.position);
    };

    this.reset = function () {

        this.world.reset(level);

        var c = this.world.spawnCell();
        this.player.setPosition(c.position.x * Cell.SIZE, c.position.y * Cell.SIZE);

        this.entityManager.reset(level);
        this.bombManager.reset();

        this.entityManager.addXEnemy(level);

        this.timer = new Time();
        this.timer.startTimer(init_seconds + (level));

    };

    this.update = function (delta) {
        this.world.update(delta);
        this.player.update(delta);
        this.entityManager.update(delta);
        this.bombManager.update();

        this.entityManager.collides(this.player.bounds);

        if (this.entityManager.isEmpty()) {
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
        if(!mute)
            document.getElementById("audio_next_level").play();
        level++;
        this.score.saveScore();
        this.reset();
    };

    this.render = function () {
        this.world.render();
        this.entityManager.render();
        this.bombManager.render();
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
        this.entityManager.debug(ctx);
        this.bombManager.debug();
        this.player.debug(ctx);
        this.gui.debug(ctx);
        ctx.globalAlpha = 1;

    };

    this.dispose = function () {
        this.world.dispose();
        this.player.dispose();
        this.entityManager.dispose();
        this.bombManager.dispose();
        this.gui.dispose();
        this.score.saveScore();
        this.score.dispose();
    };
}

function GameOver(){

    var score;

    var play;
    var menu;

    this.init = function () {
        score = new Score();
        score.loadPrevScore();
        score.checkIfIsBest();

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

        ctx.font = "24px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";


        ctx.fillStyle = 'red';
        ctx.font = '70pt Calibri';
        ctx.fillText('GameOver!', canvas.width / 2, canvas.height / 2 - (150));
        ctx.fillStyle = 'white';
        ctx.font = '40pt Calibri';
        ctx.fillText('Your Score is: ' + score.getScore(), canvas.width / 2, canvas.height / 2 - (20));
        ctx.fillText('HighScore: ' + score.getBest(), canvas.width / 2, canvas.height / 2 - (-40));
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
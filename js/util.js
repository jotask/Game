function Vector2(x, y){

    this.x = x;
    this.y = y;

    this.reset = function(){
        this.x = 0;
        this.y = 0;
    };

    this.isZero = function(){
        return Boolean((this.x === 0) && (this.y === 0));
    };

    this.dispose = function(){
        delete this.x;
        delete this.y;
    };

}

function Bound(xP, yP, w, h){

    this.x = xP;
    this.y = yP;
    this.width = w;
    this.height = h;

    this.setPosition = function (xx, yy){
        this.x = xx;
        this.y = yy;
    };

    this.debug = function(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    this.collideWith = function(other){

        var one = Boolean(this.x < (other.x + other.width));
        var two = Boolean((this.x + this.width)+100 > other.x);
        var three = Boolean(this.y < (other.y + other.height));
        var four = Boolean((this.y - this.height) > other.y);
        return Boolean(one && two && three && four);

    };

    this.collideWithEntity = function(other){

        var one = Boolean(this.x < (other.x + other.width));
        var two = Boolean((this.x + this.width) > other.x);
        var three = Boolean(this.y < (other.y + other.height));
        var four = Boolean((this.y + this.height) > other.y);
        return Boolean(one && two && three && four);

    };

    this.dispose = function () {
        delete this.x;
        delete this.y;
        delete this.width;
        delete this.height;
    }

}

function Button(s, x, y){

    var sprite = s;
    var position = new Vector2(x, y);

    var bounds = new Bound(x, y, sprite.width / 2, sprite.height);

    this.onClick = function (e) {
        var rect = canvas.getBoundingClientRect();
        return Boolean(collide(e.clientX - rect.left, e.clientY - rect.top));
    };

    this.update = function (delta) {

    };

    this.render = function(){
        sprite.draw(position.x, position.y);
    };

    this.debug = function (){
        bounds.debug();
    };

    var collide = function (mouseX, mouseY){
        return !!(((mouseX > bounds.x) && (mouseX < (bounds.x + bounds.width))) && ((mouseY > bounds.y) && (mouseY < (bounds.y + bounds.height))));

    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function isNull(object){
    return Boolean(object === 'undefined' || object == null);
}

function EntityManager(w){

    var ENEMY = {
        SPIDER: 0,
        ZOMBIE: 1
    };

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
        var enemy = createRandomEnemy();
        enemy.init();
        var c = world.spawnCell();
        enemy.setPosition(c.position.x * Cell.SIZE, c.position.y * Cell.SIZE);
        addEntity(enemy);
    };

    var createRandomEnemy = function(){
        var random;
        random = getRandomInt(0,2);
        switch (random){
            case ENEMY.SPIDER:
                return new Spider();
            case ENEMY.ZOMBIE:
                return new Zombie();
            default:
                console.error("states.entityManager.createRandomEnemy");
                return new Enemy();
        }
    };

    var addEntity = function (e){
        entities.push(e);
    };

    this.collides = function(b){
        for(var i = 0; i < entities.length; i++){
            if(Boolean(b.collideWithEntity(entities[i].getBounds()))){
                if(!mute)
                    document.getElementById("audio_kill").play();
                gsm.getState().score.addScore(Number(1));
                this.removeEnemy(entities[i]);
            }
        }
    };

    this.isEmpty = function () {
        return Boolean(entities.length <= 0);
    };

    this.removeEnemy = function (e) {
        while (entities.indexOf(e) !== -1) {
            entities.splice(entities.indexOf(e), 1);
        }
    };

    this.reset = function () {
        entities = [];
    };

    this.update = function (){
        if(!this.isEmpty()) {
            for (var i = 0; i < entities.length; i++) {
                entities[i].update();
            }
            randomUpdate();
        }
    };

    var randomUpdate = function(){
        var selection = 5;
        for(var i = 0; i < selection; i++){
            // get random entity
            var r = getRandomInt(0,entities.length);
            entities[r].randomUpdate();
        }
    };

    this.render = function (){
        if(!this.isEmpty()) {
            for (var i = 0; i < entities.length; i++) {
                entities[i].render();
            }
        }
    };

    this.debug = function (){
        if(!this.isEmpty()) {
            for(var i = 0; i < entities.length; i++){
                entities[i].debug();
            }
        }
    };

    this.dispose = function (){

    }

}

function Time(){

    // Code belows is based on the next post
    // http://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer

    var timer, minutes, seconds;
    this.finished = false;

    var interval;

    this.startTimer = function (durat) {
        interval = setInterval(startTimer(durat, this), 1000);
    };

    this.setFinished = function (f){
        this.finished = Boolean(f);
    };

    function startTimer(duration, t) {
        timer = duration;
        interval = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;


            if (--timer < 0) {
                timer = duration;
                t.setFinished(true);
                clearInterval(interval);
            }
        }, 1000);
    }

    this.isFinished = function () {
        return Boolean(this.finished);
    };

    this.getMinutes = function () { return minutes;};
    this.getSeconds = function () { return seconds;}

}

function Score(){

    var score = 0;

    var high = 0;

    this.getScore = function () {
        return score;
    };

    this.addScore = function (s) {
        score = score + parseInt(s);
    };

    this.getBest = function (){
        this.checkIfIsBest();
        return high;
    };

    this.reset = function () {
        score = 0;
    };

    this.loadPrevScore = function () {
        score = parseInt(localStorage.getItem("score") || 0);
    };

    this.saveScore = function () {
        localStorage.setItem("score", score);
    };

    this.checkIfIsBest = function(){
        high = parseInt(localStorage.getItem("high") || 0);
        if(high !== null){
            if (score > high) {
                localStorage.setItem("high", score );
                return true;
            }
        }
        return false;
    };

    this.dispose = function () {

    }

}

function WeaponManager (){

    var bombs = [];

    this.init = function (){

    };

    this.newBomb = function (p) {
        var bomb = new Bomb(new Vector2(p.x, p.y));
        addBomb(bomb);
    };

    var addBomb = function (e){
        bombs.push(e);
    };

    this.isEmpty = function () {
        return Boolean(bombs.length <= 0);
    };

    var removeBomb = function (e) {
        while (bombs.indexOf(e) !== -1) {
            bombs.splice(bombs.indexOf(e), 1);
        }
    };

    this.reset = function () {
        bombs = [];
    };

    this.update = function (){
        if(!this.isEmpty()) {
            for (var i = 0; i < bombs.length; i++) {
                if(isNull(bombs[i])){
                    continue;
                }
                if(bombs[i].needsExplode()){
                    bombs[i].explode();
                    if(!mute)
                        document.getElementById("sound_explosion").play();
                    removeBomb(bombs[i]);
                    continue;
                }
                bombs[i].update();
            }
        }
    };

    this.render = function (){
        if(!this.isEmpty()) {
            for (var i = 0; i < bombs.length; i++) {
                bombs[i].render();
            }
        }
    };

    this.debug = function (){
        if(!this.isEmpty()) {
            for(var i = 0; i < bombs.length; i++){
                bombs[i].debug();
            }
        }
    };

    this.dispose = function (){

    }
}

function Bomb(p){

    const SIZE = 4;

    const timeToExplode = 100;
    var position = p;

    // TOP LEFT
    var topLeft = new Bound((position.x  - (Cell.SIZE * SIZE)) + s_bomb.width,(position.y  - (Cell.SIZE * SIZE)) + s_bomb.height, Cell.SIZE * SIZE, Cell.SIZE * SIZE);
    // // TOP RIGHT
    var topRight = new Bound(position.x,(position.y  - (Cell.SIZE * SIZE)) + s_bomb.height, Cell.SIZE * SIZE, Cell.SIZE * SIZE);

    // // BOTTOM LEFT
    var bottomLelft = new Bound((position.x  - (Cell.SIZE * SIZE)) + s_bomb.width,position.y, Cell.SIZE * SIZE, Cell.SIZE * SIZE);
    // // BOTTOM RIGHT
    var bottomRight= new Bound(position.x, position.y, Cell.SIZE * SIZE, Cell.SIZE * SIZE);

    var currentTime = 0;

    this.update = function () {
        currentTime += 1;
    };

    this.render = function () {
        s_bomb.draw(position.x,position.y);
    };

    this.needsExplode = function(){
        return Boolean(currentTime > timeToExplode);
    };

    this.explode = function () {

        var state;
        state = gsm.getState();

        // GET PLAYER SURROUND
        state.entityManager.collides(topLeft);
        state.entityManager.collides(topRight);
        state.entityManager.collides(bottomLelft);
        state.entityManager.collides(bottomRight);

        var tmp = ( state.player.bounds.collideWithEntity(topLeft) ||
                    state.player.bounds.collideWithEntity(topRight) ||
                    state.player.bounds.collideWithEntity(bottomLelft) ||
                    state.player.bounds.collideWithEntity(bottomRight));

        if(tmp){
            var c = state.world.spawnCell();
            state.player.setPosition(c.position.x * Cell.SIZE, c.position.y * Cell.SIZE);
        }

    };

    this.debug = function () {
        topLeft.debug();
        topRight.debug();
        bottomLelft.debug();
        bottomRight.debug();
    };

    this.dispose = function () {

    }

}
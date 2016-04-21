
var

    debug = false,

    canvas,
    ctx,
    width,

    fgpos = 0,
    frames = 0,
    score = 0,
    best  = localStorage.getItem("best") || 0,

    currentstate,
    states = {
        Splash: 0,
        Game: 1,
        Score: 2
    },

    bird = {

        god: false,

        x: 60,
        y: 0,

        frame: 0,
        velocity: 0,
        animation: [0,1,2,1],

        rotation: 0,
        radius: 12,

        gravity: 0.25,
        _jump: 4.6,

        jump: function(){
          this.velocity = -this._jump;
        },

        update: function(){
            var n = currentstate === states.Splash ? 10: 5;
            this.frame += frames % n === 0 ? 1: 0;
            this.frame %= this.animation.length;

            if(currentstate === states.Splash){
                this.y = height - 280 + 5 * Math.cos(frames/10);
                this.rotation = 0;
            }
            if(currentstate === states.Game){
                this.velocity += this.gravity;
                this. y += this.velocity;

                if(this.y >= height - s_fg.height - 10){
                    this.y = height - s_fg.height - 10;
                    if(currentstate === states.Game){
                        if(!Boolean(this.god)){
                            currentstate = states.Score;
                        }
                    }
                    this.velocity = this._jump;
                }

                if(this.velocity >= this._jump){
                    this.frame = 1;
                    this.rotation = Math.min(Math.PI / 2, this.rotation + 0.3);
                }else{
                    this.rotation = -0.3;
                }
                if(currentstate === states.Score){

                }
            }


        },

        render: function (ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            var n = this.animation[this.frame];
            s_bird[n].draw(ctx, -s_bird[n].width/2, -s_bird[n].height/2);

            if(Boolean(debug)) {
                ctx.fillStyle = "#f00";
                ctx.beginPath();
                ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
                ctx.fill();
            }

            ctx.restore();

        }

    },

     pipes = {

         _pipes: [],

         reset: function () {
             this._pipes = [];
         },

         update: function(){
            if(frames % 100 === 0) {
                var _y = height - (s_pipeSouth.height + s_fg.height + 120 + 200 * Math.random());
                this._pipes.push({
                    x: 500,
                    y: _y,
                    width: s_pipeSouth.width,
                    height: s_pipeNorth.height
                });
            }

            for(var i = 0, len = this._pipes.length; i < len; i++){
                var p = this._pipes[i];

                // check collision for the first pipe
                if(i === 0){

                    score += p.x === bird.x ? 1 : 0;

                    var cx = Math.min(Math.max(bird.x, p.x), p.x + p.width);
                    var cy1 = Math.min(Math.max(bird.y, p.y), p.y + p.height);
                    var cy2 = Math.min(Math.max(bird.y, p.y + p.height + 80), p.y +  2 * p.height + 80);

                    var dx = bird.x - cx;
                    var dy1 = bird.y - cy1;
                    var dy2 = bird.y - cy2;

                    var d1 = dx*dx + dy1*dy1;
                    var d2 = dx*dx + dy2*dy2;

                    var r = bird.radius * bird.radius;

                    if(r > d1 || r > d2){
                        currentstate = states.Score;
                    }

                }

                p.x -= 2;
                if(p.x < -p.width){
                    this._pipes.splice(i,1);
                    i--;
                    len--;
                }
            }
         },

         render: function(ctx){
             for(var i = 0, len = this._pipes.length; i < len; i++){
                 var p = this._pipes[i];
                 s_pipeSouth.draw(ctx, p.x, p.y);
                 s_pipeNorth.draw(ctx, p.x, p.y + 80 + p.height);
             }
             if(Boolean(debug)){
                 ctx.save();
                 ctx.fillStyle = "#f00";
                 ctx.beginPath();
                 ctx.rect(p.x, p.y, p.width, p.height);
                 ctx.fill();
                 ctx.restore();
             }
         }

     };

function onpress(evt){
    switch(currentstate){
        case states.Splash:
            currentstate = states.Game;
            bird.jump();
            break;
        case states.Game:
            bird.jump();
            break;
        case states.Score:

            // get event position
            var mx = evt.offsetX, my = evt.offsetY;
            if (mx == null || my == null) {
                mx = evt.touches[0].clientX;
                my = evt.touches[0].clientY;
            }
            // check if within
            if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
                okbtn.y < my && my < okbtn.y + okbtn.height
            ) {
                pipes.reset();
                currentstate = states.Splash;
                score = 0;
            }

            break;
        default:
            console.error("onpress.error");
    }
}

function main(){

    canvas = document.createElement("canvas");

    width = window.innerHeight;
    height = window.innerHeight;

    var evt = "touchstart";
    if(width >= 500){
        width = 320;
        height = 480;
        canvas.style.border = "13px dotted white";
        evt = "mousedown";
    }

    document.addEventListener(evt, onpress);

    canvas.width = width;
    canvas.height = height;
    if (!(!!canvas.getContext && canvas.getContext("2d"))) {
        alert("Your browser doesn't support HTML5, please update to latest version");
    }

    ctx = canvas.getContext("2d");
    currentstate = states.Splash;
    // append canvas to document
    document.body.appendChild(canvas);

    var img = new Image();
    img.onload = function(){
        initSprites(this);
        ctx.fillStyle = s_bg.color;

        okbtn = {
            x: (width - s_buttons.Ok.width)/2,
            y: height - 200,
            width: s_buttons.Ok.width,
            height: s_buttons.Ok.height
        };

        run();
    };

    img.src = "assets/sheet.png";

}

function run(){

    var loop = function(){
        update();
        render();
        window.requestAnimationFrame(loop, canvas);
    };

    window.requestAnimationFrame(loop, canvas)

}

function update(){

    frames++;

    if(currentstate === states.Splash){
        bird.update();
    }
    if(currentstate === states.Game){
        fgpos = (fgpos - 2) % 14;
        // set best score to maximum score
        best = Math.max(best, score);
        localStorage.setItem("best", best);
        bird.update();
        pipes.update();
    }
    if(currentstate === states.Score){
        bird.update();
    }

}

function render(){
    ctx.fillRect(0,0,width, height);

    // var context = canvas.getContext('2d');
    // context.clearRect(0,0,canvas.width,canvas.height)

    s_bg.draw(ctx, 0, height - s_bg.height);
    s_bg.draw(ctx, s_bg.width, height - s_bg.height);

    s_fg.draw(ctx, fgpos, height - s_fg.height);
    s_fg.draw(ctx, fgpos + s_fg.width, height - s_fg.height);

    var width2 = width / 2;

    if(currentstate === states.Splash){
        s_splash.draw(ctx, width2 - s_splash.width / 2, height - 300);
        s_text.GetReady.draw(ctx, width2 - s_text.GetReady.width / 2, height - 380);

        bird.render({parameters: {parameters: {parameters: {ctx: ctx}}}});
    }
    if(currentstate === states.Game){
        pipes.render({parameters: {parameters: {parameters: {ctx: ctx}}}});
        s_numberB.draw(ctx, null, 20, score, width2);
        bird.render({parameters: {parameters: {parameters: {ctx: ctx}}}});
    }
    if(currentstate === states.Score){
        pipes.render({parameters: {parameters: {parameters: {ctx: ctx}}}});
        bird.render({parameters: {parameters: {parameters: {ctx: ctx}}}});
        
        // draw gameover text and score board
        s_text.GameOver.draw(ctx, width2 - s_text.GameOver.width/2, height-400);
        s_score.draw(ctx, width2 - s_score.width/2, height-340);
        s_buttons.Ok.draw(ctx, okbtn.x, okbtn.y);
        // draw score and best inside the score board
        s_numberS.draw(ctx, width2-47, height-304, score, null, 10);
        s_numberS.draw(ctx, width2-47, height-262, best, null, 10);

    }
}
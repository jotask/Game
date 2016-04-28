function Gui(g){

    var middleX = canvas.width / 2;

    var game = g;

    this.init = function (){

    };

    this.update = function (delta){

    };

    this.render = function (){
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        var m = game.timer.getMinutes();
        var s = game.timer.getSeconds();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "gray";
        ctx.fillRect(150,0,207, 60);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "white";
        if(!isNaN(s) && !isNaN(m)) {
            if(s < 3)
                ctx.fillStyle = "red";
            ctx.fillText("Time Left: " + m + ":" + s, middleX, 0);
        }
        ctx.fillStyle = "white";
        ctx.fillText("Points: " + game.score.getScore(), middleX, 30);
    };

    this.debug = function (){

    };

    this.dispose = function () {

    }

}
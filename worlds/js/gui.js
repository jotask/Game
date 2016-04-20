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
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        var m = game.timer.getMinutes();
        var s = game.timer.getSeconds();
        if(!isNaN(s) && !isNaN(m)) {
            if(s < 3)
                ctx.fillStyle = "red";
            ctx.fillText("Time Left: " + m + ":" + s, middleX - 20, 0);
        }
        ctx.fillStyle = "white";
        ctx.fillText("Points: " + game.score.getScore(), middleX, 100);
    };

    this.debug = function (){

    }

    this.dispose = function () {

    }

}
function Gui(){


    this.init = function (){

    };

    this.update = function (delta){

    };

    this.render = function (ctx){
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Monster caught: " + monsterCaught, 32, 32);
    };

    this.debug = function (ctx){

    }

}
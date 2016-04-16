/**
 * Created by Jota on 16/04/2016.
 */

var
    canvas,
    ctx,
    width,
    height,

    frames = 0,
    score = 0,
    best  = 0,

    currentsate,
    states = {
        Splash: 0,
        Game: 1,
        Scores: 2
    },

    bird = {

    },
     pipes = {

     };

function main(){
    canvas = document.createElement("canvas");

    width = window.innerHeight;
    height = window.innerHeight;

    if(width = 500){
        width = 320;
        height = 480;
        canvas.style.border = "1px solid red":
    }

    canvas.width = width;
    canvas.height = height;

    document.body.appendChild(canvas);

}

function run(){

}

function update(){

}

function render(){

}

main();
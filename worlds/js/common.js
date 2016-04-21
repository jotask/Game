
function toggle(lnk_obj) {

    if (lnk_obj.innerHTML == '!Show Spoilers!') {
        document.getElementById("spoilers").style.display = "block";
        document.getElementById("about").style.display = "none";
    } else {
        document.getElementById("spoilers").style.display = "none";
        document.getElementById("about").style.display = "block";
    }

    lnk_obj.innerHTML = (lnk_obj.innerHTML == '!Show Spoilers!') ? '!Hide Spoilers!' : '!Show Spoilers!';

}

var cheat = false;
function showCheats() {

    if (!cheat) {
        document.getElementById("cheats").style.display = "block";
        cheat = true;
    } else {
        document.getElementById("cheats").style.display = "none";
        cheat = false;
    }

}


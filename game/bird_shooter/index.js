let counter = 1;

let start = "";

let end = "";

let totalTime = "";

if (localStorage.getItem("topScore") !== null) {
    let topScore = localStorage.getItem("topScore");
    document.getElementById("topScore").innerHTML = topScore + "s";
}

showBird ();
function showBird () {
    let top = Math.random () * 400;
    let left = Math.random () * 400;
    start = new Date().getTime();
    document.getElementById("bird").src = "bird.png";
    document.getElementById("bird").style.height = 60 + "px";
    document.getElementById("bird").style.width = 60 + "px";
    document.getElementById("bird").style.top = top + "px";
    document.getElementById("bird").style.left = left + "px";
    document.getElementById("bird").style.position = "relative";
    document.getElementById("bird").style.display = "block";
}

document.getElementById("bird").onclick = function () {
    document.getElementById("bird").src = "bom.png";
    document.getElementById("bird").style.height = 120 + "px";
    document.getElementById("bird").style.width = 120 + "px";
    setTimeout(hideBird,200);
    if (counter < 5) {
        setTimeout(showBird,300);
        counter++;
    } else {
        setTimeout(function() {alert ("BIRD SHOOTER IS FINISHED!"); }, 100);
        end = new Date().getTime();
        totalTime = (end - start) / 1000;
        document.getElementById("totalTime").innerHTML = totalTime + "s";
        setTopscore();
    }   
}

function hideBird () {
    document.getElementById("bird").style.display = "none";
}

function setTopscore () {
    if (localStorage.getItem("topScore") == null) {
        localStorage.setItem("topScore",totalTime);
        document.getElementById("topScore").innerHTML = totalTime + "s";
    } else if (totalTime < localStorage.getItem("topScore")) {
        localStorage.setItem("topScore",totalTime);
        document.getElementById("topScore").innerHTML = totalTime + "s";
    } 
}
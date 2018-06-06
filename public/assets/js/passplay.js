// calculates how many yards gained by passing
let passYardage = 0
// calculates how many yards gained by rushing
let runYardage = 0
// viking average yards per run
const offRun = 6.2
// opponents average rush yards allowed per run play
const defRun = 3.4
// viking average yards per pass
const offPass = 8.5
// opponents average rush yards allowed per ppass play
const defPass = 4.6
// totalYardage used to calculate field position and yardage to score
let totalYardage = 20
// current yardage used to calculate down vs distance 
let currentYardage = 0
let totalPoints = 0
let downs = 1
let totalTime = 900000;
let gameTime = 30000;
let turnoverTime = 90000; 

var opponentstats = JSON.parse(localStorage.getItem('opponentValues'));
const opponentOffRun = opponentstats[0];
const opponentDefRun = parseInt(opponentstats[1]);
const opponentDefPass = parseInt(opponentstats[2]);

$( document ).ready(function(){
// passplay function is the function that allows for a random pass play to be run
function passPlay() {
    var toString = Object.prototype.toString,
        slice = Array.prototype.slice;
        // probability is the function that allows for determining how often a play is run.  ie: "run this function 8% of the time"
    function Probability() {
        var i = 0,
            l = 0,
            probas = [],
            functions = [],
            sum = 0,
            args = toString.call(arguments[0]) === '[object Array]' ? arguments[0] : slice.call(arguments);
        args.push({
            p: 0,
            f: function () { }
        });
        for (i = 0, l = args.length; i < l; i++) {
            var p = Math.abs(parseFloat(args[i].p)),
                f = args[i].f;
            if (isNaN(p) || typeof f !== 'function') {
                throw new TypeError('Probability.js: Invalid probability object in argument ' + i + '.');
            }
            if (/%/.test(args[i].p)) {
                p = p / 100.0;
            }
            sum += p;
            if (sum > 1.0) {
                throw new TypeError('Probability.js: Probability exceeds "1.0" (=100%) in argument ' + i + ': p="' + p + '" (=' + p * 100 + '%), sum="' + sum + '" (=' + sum * 100 + '%).');
            }
            probas[i] = sum;
            functions[i] = f;
        }
        return function probabilitilized() {
            var random = Math.random();
            for (i = 0, l = probas.length - 1; i < l && random >= probas[i]; i++) {
                /* intentionally left empty */
            }
            return functions[i].apply(this, arguments);
        };
    }


    function getRandomInt(min, max) {
        return Math.floor( Math.random() * (max - min) + min);
    }
// when a pass is thrown but not completed
    function incompletePass() {
        console.log("The pass was incomplete")
        passYardage = 0
        return passYardage
    }
// when the def makes a play and the offense gets negative yardage
    function bigDefPlay() {
        let yards = getRandomInt(8, 1)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Oooohh.  The Vikings got blown up by a sack for a loss of ${roundedYards} yards!`)
        passYardage -= roundedYards
        console.log(passYardage)
        return passYardage
    }
// an average pass play that gives a random number between the offense and defense average
    function normalPass() {
        let yards = getRandomInt(offPass, opponentDefPass)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Pass complete for a gain of ${roundedYards} yards!`)
        passYardage += roundedYards
        console.log(passYardage)
        return passYardage
    }
// the offense make a "big play" (over 20 yards) and gets a random number between 20 and 80
    function bigPassPlay() {
        let yards = getRandomInt(80, 20)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Holy fucking shit!  The Vikings strike for ${roundedYards} yards!`)
        passYardage += roundedYards
        console.log(passYardage)
        return passYardage
    }

    var probabilitilized = new Probability({ p: "30%", f: incompletePass }, { p: "13%", f: bigDefPlay }, { p: "52%", f: normalPass }, { p: "5%", f: bigPassPlay })

    for (let i = 0; i < 1; i++) {
        probabilitilized();
    }
}


// all of these functions below mirror the pass plays, but they are for runs
function runPlay() {
    var toString = Object.prototype.toString,
        slice = Array.prototype.slice;
    function Probability() {
        var i = 0,
            l = 0,
            probas = [],
            functions = [],
            sum = 0,
            args = toString.call(arguments[0]) === '[object Array]' ? arguments[0] : slice.call(arguments);
        args.push({
            p: 0,
            f: function () { }
        });
        for (i = 0, l = args.length; i < l; i++) {
            var p = Math.abs(parseFloat(args[i].p)),
                f = args[i].f;
            if (isNaN(p) || typeof f !== 'function') {
                throw new TypeError('Probability.js: Invalid probability object in argument ' + i + '.');
            }
            if (/%/.test(args[i].p)) {
                p = p / 100.0;
            }
            sum += p;
            if (sum > 1.0) {
                throw new TypeError('Probability.js: Probability exceeds "1.0" (=100%) in argument ' + i + ': p="' + p + '" (=' + p * 100 + '%), sum="' + sum + '" (=' + sum * 100 + '%).');
            }
            probas[i] = sum;
            functions[i] = f;
        }
        return function probabilitilized() {
            var random = Math.random();
            for (i = 0, l = probas.length - 1; i < l && random >= probas[i]; i++) {
                /* intentionally left empty */
            }
            return functions[i].apply(this, arguments);
        };
    }
    function getRandomInt(min, max) {
        return Math.floor( Math.random() * (max - min) + min);
    }

    function bigRunPlay() {
        let yards = getRandomInt(80, 20)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Holy cow!  The vikings strike for a ${roundedYards} yard play!`)
        runYardage += roundedYards
        console.log(runYardage)
        return runYardage
    }

    function bigDefPlay() {
        let yards = getRandomInt(8, 1)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Holy smokes!  The defense just stuffed the vikings for a loss of ${roundedYards} yards!`)
        runYardage -= roundedYards
        console.log(runYardage)
        return runYardage
    }


    function normalRun() {
        let yards = getRandomInt(offRun, opponentDefRun)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`The Vikings pound the ball for a gain of ${roundedYards} yards!`)
        runYardage += roundedYards
        console.log(runYardage)
        return runYardage
        
    }

    function noGain() {
        console.log("The defense comes up big and stuffs the runner for no gain")
    }

    var probabilitilized = new Probability({ p: "8%", f: bigRunPlay }, { p: "8%", f: bigDefPlay }, { p: "60%", f: normalRun }, { p: "14%", f: noGain })

    for (let i = 0; i < 1; i++) {
        probabilitilized();

    }
}
// This calculates if the offense scored and resets down and distance if they did
function totalYards (){
    if (totalYardage >= 80) {
        totalPoints += 7; 
        document.getElementById("points").innerHTML=totalPoints
        downs = 1
        currentYardage = 0;
        totalYardage = 20;
        console.log("Touchdown!")
}}
// this calcualtes whether the offense gained at least 10 yards in 4 plays and resets the downs to 1 if they did
function firstDown (){
    if (currentYardage >= 10) {
        console.log("First Down!"); 
        downs = 1
        currentYardage = 0
    } else {
        downs += 1
        console.log("no first")
    }
}
// if they did not gain 10 yards in 4 plays, this resets total yardage to 20, runs 1:30 off the clock and resets down and distance 
function totalDowns(){
    if (downs > 4 && currentYardage < 10 ) {
        console.log("turnover")
        totalYardage = 20
        downs = 1
        currentYardage = 0
        totalTime -= turnoverTime
    }
}

$("#pass-btn").on("click", function() {
    passPlay(); 
    totalYardage += passYardage
    currentYardage += passYardage
    passYardage = 0
    firstDown();
    totalYards();
    totalDowns(); 
    document.getElementById("down").innerHTML=downs
    document.getElementById("togo").innerHTML=(10-currentYardage)
    // document.getElementById("data_place").innerHTML=totalYardage
    document.getElementById("points").innerHTML=totalPoints
    console.log("current yards", currentYardage)
    
  });

  $("#run-btn").on("click", function() {
    runPlay();
    totalYardage += runYardage
    currentYardage += runYardage
    runYardage = 0
    totalYards();
    firstDown(); 
    totalDowns(); 
    document.getElementById("down").innerHTML=downs
    document.getElementById("togo").innerHTML=(10-currentYardage)
    // document.getElementById("data_place").innerHTML=totalYardage
    document.getElementById("points").innerHTML=totalPoints
    console.log("current yards", currentYardage)
  });

// functions to run time off the clock when either button is clicked
function gameStart(){

    // displayed timer when the game starts
    let timer = moment.utc(totalTime).format("mm:ss")
    console.log(timer);

    // display it on the dom
    $("#timer").text(timer);

}

// fucntion when button clicked 
$("#run-btn").on("click", function(){

    // condition to restart the game 
    if (totalTime <= 0){
        totalTime = 900000;
        gameStart();

    }else{
        // subtracts the game time from total time
        totalTime -= gameTime;
        console.log(totalTime)
        // changes the diffrence to a mm:ss format
        timer = moment.utc(totalTime).format("mm:ss");
        console.log(timer)

        // display it on the dom
        $("#timer").text(timer);
    }

})
// fucntion when button clicked 
$("#pass-btn").on("click", function(){

    // condition to restart the game 
    if (totalTime <= 0){
        totalTime = 900000;
        gameStart();

    }else{
        // subtracts the game time from total time
        totalTime -= gameTime;
        console.log(totalTime)
        // changes the diffrence to a mm:ss format
        timer = moment.utc(totalTime).format("mm:ss");
        console.log(timer)

        // display it on the dom
        $("#timer").text(timer);
    }

})



}); 




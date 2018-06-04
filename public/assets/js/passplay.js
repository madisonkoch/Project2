let passYardage = 0
let runYardage = 0
const offRun = 6.2
const defRun = 3.4
const offPass = 8.5
const defPass = 4.6
// totalYardage used to calculate field position and yardage to score
let totalYardage = 20
// current yardage used to calculate down vs distance 
let currentYardage = 0
let totalPoints = 0
let downs = 1

$( document ).ready(function(){
function passPlay() {
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
        return Math.random() * (max - min) + min;
    }

    function incompletePass() {
        console.log("The pass was incomplete")
        passYardage = 0
        return passYardage
    }

    function bigDefPlay() {
        let yards = getRandomInt(8, 1)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Oooohh.  The Vikings got blown up by a sack for a loss of ${roundedYards} yards!`)
        passYardage -= roundedYards
        console.log(passYardage)
        return passYardage
    }

    function normalPass() {
        let yards = getRandomInt(offPass, defPass)
        let roundedYards = Math.round(yards * 10) / 10;
        console.log(`Pass complete for a gain of ${roundedYards} yards!`)
        passYardage += roundedYards
        console.log(passYardage)
        return passYardage
    }

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
        return Math.random() * (max - min) + min;
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
        let yards = getRandomInt(offRun, defRun)
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

function totalYards (){
    if (totalYardage >= 80) {
        totalPoints += 7; 
        document.getElementById("score").innerHTML=totalPoints
        downs = 1
        currentYardage = 0;
        totalYardage = 20;
        console.log("Touchdown!")
}}

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

function totalDowns(){
    if (downs > 4 && currentYardage < 10 ) {
        console.log("turnover")
        totalYardage = 20
        downs = 1
        currentYardage = 0
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
    document.getElementById("togo").innerHTML=currentYardage
    document.getElementById("data_place").innerHTML=totalYardage
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
    document.getElementById("togo").innerHTML=currentYardage
    document.getElementById("data_place").innerHTML=totalYardage
    document.getElementById("points").innerHTML=totalPoints
    console.log("current yards", currentYardage)
  });
}); 




var audioBoo = new Audio("assets/audio/boo.mp3");
var audioHorn = new Audio("assets/audio/horn.mp3");
var audioSkol = new Audio("assets/audio/skol.mp3");
var audioTouchdown = new Audio("assets/audio/touchdown.mp3");





var args = JSON.parse(localStorage.getItem('opponentValues'));
let opponentstatss = args.replace("[", '"');
opponentstatss = opponentstatss.replace("]", ''); 
let opponentstats = opponentstatss.split(",");
console.log(opponentstats)
// const opponentOffRun = parseInt(opponentstats[1]);
const opponentDefRun = parseInt(opponentstats[1]);
const opponentDefPass = parseInt(opponentstats[2]);

// calculates how many yards gained by passing
let passYardage = 0
// calculates how many yards gained by rushing
let runYardage = 0
// viking average yards per runo
const offRun = 6.2
// opponents average rush yards allowed per run play
// const defRun = 3.4
// viking average yards per pass
const offPass = 8.5
// opponents average rush yards allowed per ppass play
// const defPass = 4.6
// totalYardage used to calculate field position and yardage to score
let totalYardage = 20
// current yardage used to calculate down vs distance 
let currentYardage = 0
let totalPoints = 0
let downs = 1
let totalTime = 900000;
let gameTime = 30000;
let turnoverTime = 90000; 


// the sum of yards gained & lossed throughout the entire game
let netYards =0;
// the sum of yards gained durring until a touchdown or turnover occurs
let possessionYards = 0;
// the game's net yards
var gameYards = 0;

$( document ).ready(function(){
    function resetAudio() {
        audioBoo.pause();
        audioBoo.currentTime = 0;
        audioSkol.pause();
        audioSkol.currentTime = 0;
        audioHorn.pause();
        audioHorn.currentTime = 0;
        audioTouchdown.pause();
        audioTouchdown.currentTime = 0;
    }
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
            $("#in-game-message").text("-INCOMPLETE-");
            $("#in-game-yardage").text("");
            passYardage = 0
            return passYardage
        }
    // when the def makes a play and the offense gets negative yardage
        function bigDefPlay() {
            let yards = getRandomInt(8, 1)
            let roundedYards = Math.round(yards * 10) / 10;
            console.log(`Oooohh.  The Vikings got blown up by a sack for a loss of ${roundedYards} yards!`)
            $("#in-game-message").text("SACK!");
            $("#in-game-yardage").text("-"+roundedYards+" YARDS");
            netYards -=roundedYards;
            possessionYards -=roundedYards;
            gameYards -= roundedYards;
            console.log("Pos Yards = "+ possessionYards);
            passYardage -= roundedYards
            console.log(passYardage)
            return passYardage
        }
    // an average pass play that gives a random number between the offense and defense average
        function normalPass() {
            let yards = getRandomInt(offPass, opponentDefPass)
            let roundedYards = Math.round(yards * 10) / 10;
            console.log(`Pass complete for a gain of ${roundedYards} yards!`)
            $("#in-game-message").text("COMPLETE");
            $("#in-game-yardage").text("+"+roundedYards+" YARDS")
            netYards += roundedYards;  
            possessionYards +=roundedYards;
            gameYards += roundedYards;
            console.log("Pos Yards = "+ possessionYards);
            passYardage += roundedYards
            console.log(passYardage)
            return passYardage
        }
    // the offense make a "big play" (over 20 yards) and gets a random number between 20 and 80
        function bigPassPlay() {
            let yards = getRandomInt(80, 20)
            let roundedYards = Math.round(yards * 10) / 10;
            console.log(`Holy fucking shit!  The Vikings strike for ${roundedYards} yards!`)
            $("#in-game-message").text("HOLY SKOL! HE CAUGHT IT!");
            $("#in-game-yardage").text("+"+roundedYards+" YARDS");
            netYards += roundedYards;
            possessionYards +=roundedYards;
            gameYards += roundedYards;
            console.log("Pos Yards = "+ possessionYards);
            passYardage += roundedYards
            console.log(passYardage)
            return passYardage
        }

        var probabilitilized = new Probability({ p: "30%", f: incompletePass }, { p: "13%", f: bigDefPlay }, { p: "52%", f: normalPass }, { p: "5%", f: bigPassPlay })

        for (let i = 0; i < 1; i++) {
            probabilitilized();
        }
    };


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
            $("#in-game-message").text("LOOK AT THAT RUN!!!");
            $("#in-game-yardage").text("+"+roundedYards+" YARDS");
            netYards += roundedYards;
            possessionYards +=roundedYards;
            gameYards += roundedYards;
            console.log("Pos Yards = "+ possessionYards);
            runYardage += roundedYards
            console.log(runYardage)
            return runYardage
        }

        function bigDefPlay() {
            let yards = getRandomInt(8, 1)
            let roundedYards = Math.round(yards * 10) / 10;
            console.log(`Holy smokes!  The defense just stuffed the vikings for a loss of ${roundedYards} yards!`)
            $("#in-game-message").text("What. A. Defense...");
            $("#in-game-yardage").text("-"+roundedYards+" YARDS");
            netYards -+ roundedYards;
            possessionYards -=roundedYards;
            gameYards -= roundedYards;
            console.log("Pos Yards = "+ possessionYards);
            runYardage -= roundedYards
            console.log(runYardage)
            return runYardage
        }


        function normalRun() {
            let yards = getRandomInt(offRun, opponentDefRun)
            let roundedYards = Math.round(yards * 10) / 10;
            console.log(`The Vikings pound the ball for a gain of ${roundedYards} yards!`)
            $("#in-game-message").text("");
            $("#in-game-yardage").text("+"+roundedYards+" YARDS");
            netYards += roundedYards;
            possessionYards +=roundedYards;
            gameYards += roundedYards;
            console.log("Pos Yards = "+ possessionYards);
            runYardage += roundedYards
            console.log(runYardage)
            return runYardage
            
        }

        function noGain() {
            console.log("The defense comes up big and stuffs the runner for no gain")
            $("#in-game-message").text("No Gain!");
            $("#in-game-yardage").text("");
        }

        var probabilitilized = new Probability({ p: "8%", f: bigRunPlay }, { p: "8%", f: bigDefPlay }, { p: "60%", f: normalRun }, { p: "14%", f: noGain })

        for (let i = 0; i < 1; i++) {
            probabilitilized();

        }
    };
    // This calculates if the offense scored and resets down and distance if they did
    function totalYards (){
        if (totalYardage >= 80) {
            totalPoints += 7; 
            document.getElementById("points").innerHTML=totalPoints
            downs = 1
            currentYardage = 0;
            totalYardage = 20;
            possessionYards=0;
            console.log("Touchdown!")
            audioTouchdown.play();
            $("#in-game-message").text("TOUCHDOWN!!!");
        }
    }

    // this calcualtes whether the offense gained at least 10 yards in 4 plays and resets the downs to 1 if they did
    function firstDown (){
        if (currentYardage >= 10 && totalYardage < 80) {
            audioHorn.play();
            console.log("First Down!"); 
            $("#in-game-message").text("FIRST DOWN!!!");
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
            totalTime -= turnoverTime;
            if (totalTime > 0) {
                audioBoo.play();
            };
            possessionYards=0;
            $("#in-game-message").text("Turnover...");
        }
    }

    // correct label for downs
    function downsLabel(){
        if (downs ===1){
            document.getElementById("down-unit").innerHTML="ST";
        }
        else if (downs === 2){
            document.getElementById("down-unit").innerHTML="ND";
        }
        else if (downs === 3){
            document.getElementById("down-unit").innerHTML="RD";
        }
        else{
            document.getElementById("down-unit").innerHTML="TH";
        }
    }

$("#pass-btn").on("click", function() {
    resetAudio();
    passPlay(); 
    totalYardage += passYardage
    currentYardage += passYardage
    passYardage = 0
    firstDown();
    totalDowns();
    totalYards();
    downsLabel();
    document.getElementById("down").innerHTML=downs
    document.getElementById("togo").innerHTML=(10-currentYardage)
    // document.getElementById("data_place").innerHTML=totalYardage
    document.getElementById("points").innerHTML=totalPoints
    console.log("current yards", currentYardage)
    console.log("game yards = "+gameYards);
    ballPosition();
    decreaseTime();
    gameEnd();
  });

  $("#run-btn").on("click", function() {
    resetAudio();
    runPlay();
        totalYardage += runYardage
        currentYardage += runYardage
        runYardage = 0
        firstDown(); 
        totalDowns(); 
        totalYards();
        downsLabel();
        document.getElementById("down").innerHTML=downs
        document.getElementById("togo").innerHTML=(10-currentYardage)
        // document.getElementById("data_place").innerHTML=totalYardage
        document.getElementById("points").innerHTML=totalPoints
        console.log("current yards", currentYardage)
        console.log("game yards = "+gameYards);
        ballPosition();
        decreaseTime();
        gameEnd();
  });

// functions to run time off the clock when either button is clicked
$("#close-btn").on("click", function(){

    // displayed timer when the game starts
    let timer = moment.utc(totalTime).format("mm:ss")
    console.log(timer);

    // display it on the dom
    $("#timer").text(timer);

});
// Decrease timer for each play
const decreaseTime =function(){
    //subtract 30sec for one play
    totalTime -= gameTime;
    console.log("Time Left: "+totalTime);
    //display time remaining in mm:ss format on DOM
    let timer = moment.utc(totalTime).format("mm:ss")
    $("#timer").text(timer);
};

//Show post-game modal when time runs out
function gameEnd(){
    if (totalTime<=0){
        audioSkol.play();
        $("#post-game-modal").css({'visibility':'visible'});
        document.getElementById("endPoints").innerHTML=totalPoints;
        document.getElementById("endYards").innerHTML=gameYards;
    }

};

$('#sub-btn').on("click", function(event){
    event.preventDefault(); 
    console.log("I clicked the button, Dad.")

    var newUser = {
        username: $("#nameInput").val().trim(), 
        points: totalPoints,
        yards: gameYards
    }; 
    console.log(newUser);
    $.ajax("api/users", {
        type: "POST", 
        data: newUser
    }) .then( function() {
        location.href = "/leaderboard";
        console.log("redirect");
    }
        
    )
})



}); //closes the on document ready
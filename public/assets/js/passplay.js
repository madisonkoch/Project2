const offPass = 7.8
const defPass = 5.5
let startingYardage = 20

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
        f: function () {}
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
            throw new TypeError('Probability.js: Probability exceeds "1.0" (=100%) in argument ' + i + ': p="' + p + '" (=' +  p * 100 + '%), sum="' + sum + '" (=' +  sum * 100 + '%).');
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

function incompletePass(){
    console.log("The pass was incomplete")
}

function bigDefPlay (){
    let yards = getRandomInt(8, 1)
    let roundedYards = Math.round( yards * 10 ) / 10;
    console.log(`Oooohh.  The Vikings got blown up by a sack for a loss of ${roundedYards} yards!`)
    startingYardage = startingYardage + roundedYards
    console.log(startingYardage)
    return startingYardage
}

function normalPass (){
    let yards = getRandomInt(offPass, defPass)
    let roundedYards = Math.round( yards * 10 ) / 10;
    console.log(`Pass complete for a gain of ${roundedYards} yards!`)
    startingYardage = startingYardage + roundedYards
    console.log(startingYardage)
    return startingYardage
}

function bigPassPlay (){
    let yards = getRandomInt(80, 20)
    let roundedYards = Math.round( yards * 10 ) / 10;
    console.log(`Holy fucking shit!  The Vikings strike for ${roundedYards} yards!`)
    startingYardage = startingYardage + roundedYards
    console.log(startingYardage)
    return startingYardage
}

var probabilitilized = new Probability({p: "30%", f: incompletePass}, {p:"13%", f: bigDefPlay}, {p: "52%", f: normalPass}, {p: "5%", f:bigPassPlay})

for (let i = 0; i < 1; i++){
    probabilitilized(); 
  }


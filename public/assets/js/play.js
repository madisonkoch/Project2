// const probability = require('./probability.js')
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
// function probabilitilized() {
//     var random = Math.random();
//     for (i = 0, l = probas.length - 1; i < l && random >= probas[i]; i++) {
//         /* intentionally left empty */
//     }
//     return functions[i].apply(this, arguments);
// };
// var counter = {
//     bigPlay: 0
// }; 

// var probabilitilized = new Probability({
//     p: '50%', 
//     f: function(){
//         counter[bigPlay]++; 
//     }
// });

// for (let i = 0; i < 100; i++){
//     probabilitilized(); 
// }

function bigOffPlay() {
    console.log("Big m-fing play!!!")
}

function bigDefPLay() {
    console.log("Strip sack!!")
}

function normalPlay(){
    console.log("Do the simple play")
}

var probabilitilized = new Probability({p: "10%", f: bigOffPlay}, {p:"2%", f: bigDefPLay}, {p: "88%", f: normalPlay})

for (let i = 0; i < 1; i++){
    probabilitilized(); 
}

// console.log(prob)


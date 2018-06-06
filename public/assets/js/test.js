// yardage, run and pass
let Play = function(){
    this.passYardage = 0,
    this.runYardage = 0,
    this.offRun = 6.2,
    this.defRun = 3.4,
    this.offPass = 8.5,
    this.defPass = 4.6,
    // totalYardage used to calculate field position and yardage to score
    this.totalYardage = 20,
    // current yardage used to calculate down vs distance 
    this.currentYardage = 0,
    this.totalPoints = 0,
    this.downs = 1,
    this.roundedYards = 0
}

// Pass Play Constructor
let Nflp = function(){
    this.passYardage = 0,
    this.offPass = 8.5,
    this.defPass = 4.6,
    // totalYardage used to calculate field position and yardage to score
    this.totalYardage = 20,
    // current yardage used to calculate down vs distance 
    this.currentYardage = 0,
    this.totalPoints = 0,
    this.downs = 1,
    this.roundedYards = 0,
    this.toString = Object.prototype.toString,
     slice = Array.prototype.slice,
     this.Probability = function() {
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
    },
    
    getRandomInt =  function (min, max) {
        return Math.random() * (max - min) + min;
    },

    this.incompletePass = function (){
        console.log("The pass was incomplete")
        this.passYardage = 0
        console.log(this.passYardage)
        return this.passYardage
    },

    this.bigDefPlay = function() {
        let yards = getRandomInt(8, 1)
        // console.log(yards)
        this.roundedYards = Math.round(yards * 10) / 10;
        // console.log(this.rounded)
        // console.log(`Oooohh.  The Vikings got blown up by a sack for a loss of ${this.roundedYards} yards!`)
        this.passYardage = this.roundedYards
        console.log(this.passYardage)
        return this.passYardage
        
    },

    this.normalPass = function() {
        let yards = getRandomInt(this.offPass, this.defPass)
        this.roundedYards = Math.round(yards * 10) / 10;
        console.log(`Pass complete for a gain of ${this.roundedYards} yards!`)
        this.passYardage += this.roundedYards
        console.log(this.passYardage)
        return this.passYardage
    },

    this.bigPassPlay = function() {
        let yards = getRandomInt(80, 20)
        this.roundedYards = Math.round(yards * 10) / 10;
        console.log(`Holy fucking shit!  The Vikings strike for ${this.roundedYards} yards!`)
        this.passYardage += this.roundedYards
        console.log(this.passYardage)
        return this.passYardage
    },

    this.probabilitilized = new this.Probability({ p: "30%", f: this.incompletePass }, { p: "13%", f: this.bigDefPlay }, { p: "52%", f: this.normalPass }, { p: "5%", f: this.bigPassPlay })
}



// Run Play Constructor 
let Nflr = function(){
    this.runYardage = 0,
    this.offRun = 6.2,
    this.defRun = 3.4,
    this.roundedYards = 0,
    this.toString = Object.prototype.toString,
        slice = Array.prototype.slice;
        this.Probability = function () {
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
        },
        getRandomInt = function (min, max) {
            return Math.random() * (max - min) + min;
        },
    
        this.bigRunPlay = function () {
            let yards = getRandomInt(80, 20)
            this.roundedYards = Math.round(yards * 10) / 10;
            console.log(`Holy cow!  The vikings strike for a ${this.roundedYards} yard play!`)
            this.runYardage += this.roundedYards
            console.log(this.runYardage,this.roundedYards)
            return this.runYardage
        },
    
        this.bigDefPlay = function () {
            let yards = getRandomInt(8, 1)
            this.roundedYards = Math.round(yards * 10) / 10;
            console.log(`Holy smokes!  The defense just stuffed the vikings for a loss of ${this.roundedYards} yards!`)
            this.runYardage -= this.roundedYards
            console.log(this.runYardage)
            return this.runYardage
        },
    
    
        this.normalRun = function () {
            let yards = getRandomInt(this.offRun, this.defRun)
            this.roundedYards = Math.round(yards * 10) / 10;
            console.log(`The Vikings pound the ball for a gain of ${this.roundedYards} yards!`)
            this.runYardage += this.roundedYards
            console.log(this.runYardage)
            return this.runYardage
        },
    
        this.noGain = function () {
            console.log("The defense comes up big and stuffs the runner for no gain")
        },
    
        this.probabilitilized = new this.Probability({ p: "8%", f: this.bigRunPlay }, { p: "8%", f: this.bigDefPlay }, { p: "60%", f: this.normalRun }, { p: "14%", f: this.noGain })
    
        // for (let i = 0; i < 1; i++) {
        //     probabilitilized();
    
        // },
    }
    
    // this.totalYards  = function (){
    //     if (this.totalYardage >= 80) {
    //         this.totalPoints + 7; 
    //         // document.getElementById("score").innerHTML=totalPoints
    // }}
    
    // this.firstDown = function (){
    //     if (this.currentYardage >= 10) {
    //         console.log("First Down!"); 
    //         this.downs = 1
    //         this.currentYardage = 0
    //     } else {
    //         this.downs += 1
    //         console.log("no first")
    //     }
    // }
    
    // this.totalDowns = function (){
    //     if (this.downs > 4 && this.currentYardage < 10 ) {
    //         console.log("turnover")
    //         this.totalYardage = 20
    //         this.downs = 1
    //         this.currentYardage = 0
    //     }
    


let Nflii = new Nflr();
let Nfli = new Nflp();
// module.exports = Nfli;
module.exports = Nflii








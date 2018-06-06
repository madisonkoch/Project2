let assert = require('chai').assert;
let expect = require('chai').expect;
let nfl = require('../public/assets/js/test.js');

// ======================================CHECK PASS PLAY==================================

// describe('Check pass plays', function(){
   
    // CHECKING INCOMPLETE PASSES
    it.skip('check if the passYardage for incomplete pass is zero', function(){

        // STORING THE INCOMPLETEPASS IN PLAY
        let totalYardage = nfl.incompletePass();

        // EXPECTING TOTAL YARDAGE EQUALS TO O
        assert.equal(totalYardage, 0);
    });

     // CHECKING YARD LOSS
    it.skip('Check yard loss', function(){

       // STORING THE BIGDEFPLAY IN PLAY
        let play = nfl.bigDefPlay()

        // PASS YARDAGE
        var PassYardage = nfl.passYardage
        , lossYard = function (){
            PassYardage -= nfl.roundedYards;
        }
        , yardLoss = function (){
            return  PassYardage;
        };

        // EXPECTING THE PASS YARDAGE TO DECREASE BY AMOUNT OF ROUNDED YARDS
        expect(lossYard).to.decrease(yardLoss).by(nfl.roundedYards)
    });

    // CHECKING THE NORAML PASS
    it.skip('Check normal', function(){

       // STORING THE BIGDEFPLAY IN PLAY
        let play = nfl.normalPass()

        // PASS YARADAGE
        var PassYardage = nfl.passYardage
        , gainedYard = function (){
            PassYardage += nfl.roundedYards;
        }
        , yardgained = function (){
            return  PassYardage;
        };

        // EXPECTING THE PASS YARDAGE TO INCREASE BY AMOUNT OF ROUNDED YARDS
        expect(gainedYard).to.increases(yardgained).by(nfl.roundedYards)
    });

    // CHECKING THE BIG PASS PLAY
    it.skip('Check Big Pass Play ', function(){

        // STORING THE BIGPASSPLAY IN PLAY
        let play = nfl.bigPassPlay()

        // PASSYARDAGE
        var PassYardage = nfl.passYardage
        , gainedYard = function (){
            PassYardage += nfl.roundedYards;
        }
        , yardgained = function (){
            return  PassYardage;
        };

       // EXPECTING THE PASS YARDAGE TO INCREASE BY AMOUNT OF ROUNDED YARDS
        expect(gainedYard).to.increases(yardgained).by(nfl.roundedYards)
    });

// });




//======================================= RUN PLAYS=============================


describe('Check run plays', function(){

    // CHECK NORMAL RUN
    it('Check normal run', function(){

        // STORING THE NORMALRUN IN PLAY
        let play = nfl.normalRun()

        // RUNYARDAGE
        let runYardage = nfl.runYardage
        , gainedYard = function (){
            runYardage += nfl.roundedYards;
        }
        , yardgained = function (){
            return  runYardage;
        };

        // EXPECTING THE RUN YARDAGE TO INCREASE BY AMOUNT OF ROUNDED YARDS
        expect(gainedYard).to.increases(yardgained).by(nfl.roundedYards)
    });

    //CHECKING THE BIG RUN PLAY
    it('Check big run play', function(){

        // STORING THE BIGRUNPLAY IN PLAY
        let play = nfl.bigRunPlay()

        // RUNYARDAGE
        var runYardage = nfl.runYardage
        , gainedYard = function (){
            runYardage += nfl.roundedYards;
        }
        , yardgained = function (){
            return  runYardage;
        };

        // EXPECTING THE RUNYARDAGE TO DECREASE BY AMOUNT OF ROUNDED YARDS
        expect(gainedYard).to.increases(yardgained).by(nfl.roundedYards)
    });
    
    //CHECKING THE YARD LOSS
    it.only('Check yard loss', function(){

        // STORING THE LOSS IN PLAY
        let play = nfl.bigDefPlay()

        // RUN YARDAGE
        var runYardage = nfl.runYardage
        , gainedYard = function (){
            runYardage -= nfl.roundedYards;
        }
        , yardgained = function (){
            return  runYardage;
        };

        // EXPECTING THE RUN YARDAGE TO DECREASE BY AMOUNT OF ROUNDED YARDS
        expect(gainedYard).to.decrease(yardgained).by(nfl.roundedYards)
    });


})

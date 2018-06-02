const runPlay = require("./play.js")
const runYardage = require("./play.js").runYardage
const passPlay = require("./passplay.js")
const passYardage = require("./passplay.js").passYardage

console.log(runYardage)
console.log(passYardage)
const offPass = 7.8
const defPass = 5.5

const offRun = 6.2
const defRun = 3.4

let totalYardage = 20

// $( document ).ready(function(){

// $("#big_butt").on("click", function() {
//     console.log("click");
//     play(); 
//     document.getElementById("#data_place").innerHTML=passYardage
    
//   });

//   $("#butt").on("click", function() {
//     play(); 
//     document.getElementById("data_place").innerHTML=totalYardage

//   });
// }); 
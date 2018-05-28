// Dependencies Required 
const express = require("express");
const router = express.Router();

// Import model to use its databse functions
// let nfl = (../models/nfl.js)

router.get("/", function(req, res){
    res.send('Wiki home page');
});

router.post("/api/teams", function(req, res){
    //response
})

router.put("/api/teams/:id", function(req, res){
    //response
})

router.get("/home", function(req, res){
    // this will bring up the home / leaderboard page
})

router.get("/game", function(req, res){
    // the actual functionality of the app
})

router.get("/profile", function(req, res){
    // generated user profiles after logging in
    // will have some statistics
})

router.get("/leaderboard", function(req, res){
    // a leraderboard of all the high scores
})

module.exports = router;
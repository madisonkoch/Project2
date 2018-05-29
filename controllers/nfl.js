// Dependencies Required 
// const express = require("express");
// const router = express.Router();
var path = require("path");
// Import model to use its databse functions
var db = require("../models");

module.exports = function(app) {



    app.get("/", function(req, res){
        db.teams.findAll({})
        .then(function(dbNfl) {  
            res.json(dbNfl);
        });
    });
    
    // app.post("/api/teams", function(req, res){
    //     //response
    // })
    
    // app.put("/api/teams/:id", function(req, res){
    //     //response
    // })
    
    // app.get("/home", function(req, res){
    //     // this will bring up the home / leaderboard page
    // })
    
    // app.get("/game", function(req, res){
    //     // the actual functionality of the app
    // })
    
    // app.get("/profile", function(req, res){
    //     // generated user profiles after logging in
    //     // will have some statistics
    // })
    
    // app.get("/leaderboard", function(req, res){
    //     // a leraderboard of all the high scores
    // })

};


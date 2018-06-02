// Dependencies Required 
// const express = require("express");
// const router = express.Router();
var path = require("path");
// Import model to use its databse functions
var db = require("../models");
var Sequelize = require("Sequelize");

module.exports = function(app) {


// * Get all teams
    app.get("/", function(req, res){
        db.teams.findAll({
            attributes: ['team_name']
        })
        .then(function(dbNfl) {  
            res.json(dbNfl);
        });
    });
// * Get all user data
    app.get("/user", function(req, res){
        db.user.findAll({})
        .then(function(dbUser) {  
            res.json(dbUser);
        });
    });


    // * Get top 5 scores 
    app.get("/leaderboard", function(req, res){
        // a leraderboard of all the high scores
        db.user.findAll({ limit: 5,
           order: [
               ['points', 'DESC'],
        ],      
        })
        .then(function(dbUser) {  
            res.json(dbUser);


    });

});

    
    // app.post("/api/teams", function(req, res){
    //     //response
    // })
    
    // app.put("/api/teams/:id", function(req, res){
    //     //response
    // })
    

    
    // app.get("/game", function(req, res){
    //     // the actual functionality of the app
    // })
    
    // app.get("/profile", function(req, res){
        // generated user profiles after logging in
        // will have some statistics
    // })
    
    

};


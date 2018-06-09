// Dependencies Required 
// const express = require("express");
// const router = express.Router();

// var path = require("path");
// Import model to use its databse functions
var db = require("../models");
var Sequelize = require("sequelize");
var express = require("express");

module.exports = function(app) {


// * Get all teams
    app.get("/", function(req, res){
        // the actual functionality of the app
        res.render("index");
    })

    app.get("/game", function(req, res){
        db.teams.findAll({
            // attributes: ['team_name']
        })
        .then(function(data) {  
            var teamsObject = {
                teams: data
            };
            //console.log('teamsObject', teamsObject);
            // eventually render this info
            res.render("game", teamsObject)
        });
    });

    app.get("/about", function(req, res){
        // the actual functionality of the app
        res.render("about");
    })

// // * Get selected team data
//     app.get("/team", function(req, res){
//         db.team.findOne
//     })



// * Get all user data
    app.get("/user", function(req, res){
        db.user.findAll({})
        .then(function(dbUser) {  
            res.json(dbUser);
        });
    });


    // * Get top 10 scores 
    app.get("/leaderboard", function(req, res){
        // a leaderboard of all the high scores
        db.user.findAll({ limit: 10, order: [['points', 'DESC'],],})
        .then(function(top) {  
            //console.log(top);
            var userobj = {
                users : top
            };
            //console.log(userobj);
            res.render("leaderboard", userobj)
    });

});
    // * Post new User to user table
    app.post("/api/users", function(req, res){
        console.log(req.body);
        db.user.create({
            username: req.body.username,
            // ? Will we post after user has played and their score has been calculated?
            points: req.body.points,
            yards: req.body.yards
        })
        .then(function(dbPost) { 
            console.log('redirect???');
            // res.json(dbPost);
            // redirect to leaderboard
            res.redirect("/leaderboard");
        });
    });
};


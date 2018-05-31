// Dependencies Required 
const express = require("express");
const router = express.Router();

// Import model to use its databse functions
// let nfl = (../models/nfl.js)

router.get("/", function(req, res){
    //have index.handlebars render in browser
    res.render("home"); //to have data returned to route use res.render("index", data-reference);
});

router.post("/api/teams", function(req, res){
    //response
})

router.put("/api/teams/:id", function(req, res){
    //response
})

module.exports = router;
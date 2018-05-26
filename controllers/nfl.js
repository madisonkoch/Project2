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

module.exports = router;
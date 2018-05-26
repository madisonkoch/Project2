var express = require("express");
var bodyParser = require("body-parser");

require('dotenv').config(); 
var connection = require("./config/connection.js")

var app = express(); 

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

<<<<<<< HEAD
let routes = require("./controllers/nfl.js");

app.use(routes);

=======
// neet to export and use routes
//app.use(routes);
>>>>>>> 5626096b3cc40970c4c60819854e7e173dc35f9b

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
  });
  
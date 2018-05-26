var express = require("express");
var bodyParser = require("body-parser");

var app = express(); 

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

let routes = require("./controllers/nfl.js");

app.use(routes);


app.listen(PORT, function() {
    console.log("App now listening at localhost:" + PORT);
  });
  
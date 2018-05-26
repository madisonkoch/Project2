var mysql = require("mysql"); 
require('dotenv').config(); 

// abdisa will be adding code here for the database connection(s)
let connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mysql.createConnection({
        port: 3306,
        host: "localhost",
        user: "root",
        password: process.env.PASSWORD,
        database: "NFL_DB",
    });
};

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
// project-two-nfl.herokuapp.com

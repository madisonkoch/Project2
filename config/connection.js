var mysql = require("mysql"); 

//require th env password
require("dotenv").config();

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
        password: "Koji@191991",
        database: "z38xzhv5bfjbkmeg",
    });
};

// project-two-nfl.herokuapp.com

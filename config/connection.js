var mysql = require("mysql"); 

// abdisa will be adding code here for the database connection(s)
let connection;
if(process.env.JAWSDB_URL) {
  //Heroku deployment
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //local host
    connection = mysql.createConnection({
        root: 3000,
        host: "localhost",
        user: "root",
        password: "",
        database: "",
    });
};

// project-two-nfl.herokuapp.com

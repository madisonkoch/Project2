// Import the ORM to create functions that will interact with the database.
// var orm = require(""../config/orm.js");
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    username: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {
    id: false,
    timestamps: false
  });
  return user;
}

// create variables to do work with the database info
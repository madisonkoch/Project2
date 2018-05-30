// Import the ORM to create functions that will interact with the database.
// var orm = require(""../config/orm.js");
var Sequelize = require("Sequelize");

module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    username: {type: Sequelize.STRING, primaryKey: true},
    points: DataTypes.INTEGER
  }, {
    timestamps: false
  });
  return user;
}

// create variables to do work with the database info
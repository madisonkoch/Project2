var Sequelize = require('sequelize');
module.exports = function (Sequelize, DataTypes) {
  var teams = Sequelize.define("teams", {
    team_name: { type: DataTypes.STRING, primaryKey: true},
    O_rush_YPA: DataTypes.INTEGER,
    O_pass_YPA: DataTypes.INTEGER,
    D_rush_YPA: DataTypes.INTEGER,
    D_pass_YPR: DataTypes.INTEGER
  }, {
  id: false,
  timestamps: false
  }
);
  return teams;
}
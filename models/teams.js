module.exports = function(sequelize, DataTypes) {
  var teams = sequelize.define("teams", {
    team_name: {type: Sequelize.STRING, primaryKey: true},
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
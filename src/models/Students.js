const Sequelize = require("sequelize");

module.exports = sequelize.define("students", {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true
  },
  bio: {
    type: Sequelize.STRING,
    allowNull: false
  },
  education: {
    type: Sequelize.STRING,
    allowNull: false
  },
  goal: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

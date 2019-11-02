const Sequelize = require("sequelize");

module.exports = sequelize.define("teachers", {
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
  best_sujbect: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rate: {
    type: Sequelize.STRING,
    allowNull: false
  },
  current_occupation: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

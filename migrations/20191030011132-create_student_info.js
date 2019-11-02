"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("students", {
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
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("students");
  }
};

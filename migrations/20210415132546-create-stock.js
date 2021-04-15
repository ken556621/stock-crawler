'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stockId: {
        type: Sequelize.STRING
      },
      ceo: {
        type: Sequelize.STRING
      },
      website: {
        type: Sequelize.STRING
      },
      startTime: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      dividend: {
        type: Sequelize.STRING
      },
      industory: {
        type: Sequelize.STRING
      },
      rp: {
        type: Sequelize.STRING
      },
      equity: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Stocks');
  }
};
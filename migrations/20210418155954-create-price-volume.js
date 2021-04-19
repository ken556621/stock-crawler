"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("priceVolumes", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stockId: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      },
      openPrice: {
        type: Sequelize.STRING
      },
      top: {
        type: Sequelize.STRING
      },
      low: {
        type: Sequelize.STRING
      },
      closePrice: {
        type: Sequelize.STRING
      },
      spread: {
        type: Sequelize.STRING
      },
      percentage: {
        type: Sequelize.STRING
      },
      volume: {
        type: Sequelize.STRING
      },
      dealPrice: {
        type: Sequelize.STRING
      },
      pe: {
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
    await queryInterface.dropTable("priceVolumes");
  }
};
"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class priceVolume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  priceVolume.init({
    stockId: DataTypes.STRING,
    date: DataTypes.STRING,
    openPrice: DataTypes.STRING,
    top: DataTypes.STRING,
    low: DataTypes.STRING,
    closePrice: DataTypes.STRING,
    spread: DataTypes.STRING,
    percentage: DataTypes.STRING,
    volume: DataTypes.STRING,
    dealPrice: DataTypes.STRING,
    pe: DataTypes.STRING
  }, {
    sequelize,
    modelName: "priceVolume",
  });
  return priceVolume;
};
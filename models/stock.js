"use strict";
const {
  Model
} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Stock.init({
    stockId: DataTypes.STRING,
    ceo: DataTypes.STRING,
    website: DataTypes.STRING,
    startTime: DataTypes.STRING,
    location: DataTypes.STRING,
    dividend: DataTypes.STRING,
    industory: DataTypes.STRING,
    rp: DataTypes.STRING,
    equity: DataTypes.STRING
  }, {
    sequelize,
    modelName: "Stock",
  });
  return Stock;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IndustryVolumn extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  IndustryVolumn.init({
    name: DataTypes.STRING,
    tradingVolume: DataTypes.STRING,
    percentage: DataTypes.STRING,
    dataSourceDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'IndustryVolumn',
  });
  return IndustryVolumn;
};
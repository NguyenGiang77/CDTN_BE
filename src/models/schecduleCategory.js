'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SchecduleCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SchecduleCategory.belongsTo(models.Allcode, { foreignKey: 'timeType', targetKey: 'keyMap', as: 'timeScheduleCateData' });
      SchecduleCategory.belongsTo(models.InforCategory, { foreignKey: 'inforCategoryId',targetKey : "id",  as: 'schecduleInforCategoryData' });
      // define association here
    }
  }
  SchecduleCategory.init({
    maxNumber: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    inforCategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SchecduleCategory',
  });
  return SchecduleCategory;
};
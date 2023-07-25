'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Category.hasMany(models.InforCategory, { foreignKey: 'categoryId', as: 'categoryInforCategoryData' })      

      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING,
    categoryHTML: DataTypes.TEXT('long'),
    categoryMarkown: DataTypes.TEXT('long'),
    image: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
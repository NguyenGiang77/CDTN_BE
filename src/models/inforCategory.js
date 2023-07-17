'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InforCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        InforCategory.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceInforCategoryData' })
        InforCategory.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentInforCategoryData' })
        InforCategory.belongsTo(models.Clinic, { foreignKey: 'clinicId', targetKey: 'id', as: 'clinicInforCategoryData' })
        InforCategory.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'categoryInforCategoryData' });
        InforCategory.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceInforCategoryData' })
        InforCategory.hasMany(models.BookingCategory, { foreignKey: 'inforCategoryId', as: 'bookingInforCategoryData' })      
        InforCategory.hasMany(models.SchecduleCategory, { foreignKey: 'inforCategoryId', as: 'schecduleInforCategoryData' })      

      // define association here
    }
  }
  InforCategory.init({
    name: DataTypes.STRING,
    inforCategoryHTML: DataTypes.TEXT('long'),
    inforCategoryMarkdown: DataTypes.TEXT('long'),
    description: DataTypes.TEXT('long'),
    clinicId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    image: DataTypes.BLOB('long')

  }, {
    sequelize,
    modelName: 'InforCategory',
  });
  return InforCategory;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
      Allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })
      Allcode.hasMany(models.User, { foreignKey: 'roleId', as: 'roleData' })    
      Allcode.hasMany(models.Schecdule, { foreignKey: 'timeType', as: 'timeTypeData' })      
      Allcode.hasMany(models.InforDoctor, { foreignKey: 'provinceId', as: 'provinceData' })      
      Allcode.hasMany(models.InforDoctor, { foreignKey: 'paymentId', as: 'paymentData' })      
      Allcode.hasMany(models.InforDoctor, { foreignKey: 'priceId', as: 'priceData' })  
      Allcode.hasMany(models.Booking, { foreignKey: 'timeType', as: 'timeData' })      
      Allcode.hasMany(models.InforCategory, { foreignKey: 'paymentId', as: 'paymentInforCategoryData' })      
      Allcode.hasMany(models.InforCategory, { foreignKey: 'priceId', as: 'priceInforCategoryData' })      
      Allcode.hasMany(models.InforCategory, { foreignKey: 'provinceId', as: 'provinceInforCategoryData' })      
      Allcode.hasMany(models.BookingCategory, { foreignKey: 'timeType', as: 'timeTypeInforCategoryData' })      
      Allcode.hasMany(models.SchecduleCategory, { foreignKey: 'timeType', as: 'timeScheduleCateData' })      


    }
  }
  Allcode.init({
    keyMap: DataTypes.STRING,
    type: DataTypes.STRING,
    valueEN: DataTypes.STRING,
    valueVN: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};
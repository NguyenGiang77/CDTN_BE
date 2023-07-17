'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookingCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BookingCategory.belongsTo(models.User, { foreignKey: 'patientId',targetKey : "id",  as: 'patientbookingCategoryData' });
      BookingCategory.belongsTo(models.InforCategory, { foreignKey: 'inforCategoryId',targetKey : "id",  as: 'bookingInforCategoryData' });
      BookingCategory.belongsTo(models.Allcode, { foreignKey: 'timeType',targetKey : "keyMap",  as: 'timeTypeInforCategoryData' });

    }
  }
  BookingCategory.init({
    statusId: DataTypes.STRING,
    patientId: DataTypes.INTEGER,
    inforCategoryId: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BookingCategory',
  });
  return BookingCategory;
};
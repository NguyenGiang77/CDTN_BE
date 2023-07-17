'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('inforCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      inforCategoryHTML: {
        type: Sequelize.Sequelize.TEXT('long')
      },

      inforCategoryMarkdown: {
        type: Sequelize.Sequelize.TEXT('long')
      },
      description
      : {
        type: Sequelize.Sequelize.TEXT('long')
      },
      clinicId
      : {
        type: Sequelize.INTEGER
      },
      categoryId
      : {
        type: Sequelize.INTEGER
      },
      provinceId: {
        type: Sequelize.STRING
      },
      priceId
      : {
        type: Sequelize.STRING
      },
      paymentId
      : {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.BLOB('long')
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('inforCategories');
  }
};
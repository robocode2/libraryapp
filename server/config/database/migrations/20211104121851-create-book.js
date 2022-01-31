'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('book');
  },
};

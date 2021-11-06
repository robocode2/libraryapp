'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('book_categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      bookId: {
        type: DataTypes.INTEGER,
        references: { model: 'book', key: 'id' },
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: { model: 'category', key: 'id' },
        allowNull: false,
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
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('book_categories');
  },
};

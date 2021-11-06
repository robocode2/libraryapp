'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('book_authors', {
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
      authorId: {
        type: DataTypes.INTEGER,
        references: { model: 'author', key: 'id' },
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
    await queryInterface.dropTable('book_authors');
  },
};

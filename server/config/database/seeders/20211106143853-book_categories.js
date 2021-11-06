'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'book_categories',
      [
        {
          id: '1',
          bookId: '1',
          categoryId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          bookId: '1',
          categoryId: '2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('book_categories', null, {}),
};

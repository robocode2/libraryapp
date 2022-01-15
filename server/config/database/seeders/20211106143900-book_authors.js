'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'book_authors',
      [
        {
          id: '1',
          bookId: '1',
          authorId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          bookId: '2',
          authorId: '2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          bookId: '3',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          bookId: '4',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          bookId: '5',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          bookId: '6',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '7',
          bookId: '7',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '8',
          bookId: '8',
          authorId: '6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '9',
          bookId: '9',
          authorId: '6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '10',
          bookId: '10',
          authorId: '6',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '11',
          bookId: '11',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '12',
          bookId: '12',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '13',
          bookId: '13',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: '14',
          bookId: '14',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: '15',
          bookId: '15',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        /* {
          id: '16',
          bookId: '16',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          id: '17',
          bookId: '17',
          authorId: '5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
 */
        {
          id: '18',
          bookId: '18',
          authorId: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '19',
          bookId: '18',
          authorId: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '20',
          bookId: '18',
          authorId: '3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('book_authors', null, {}),
};

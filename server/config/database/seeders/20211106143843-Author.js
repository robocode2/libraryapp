'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'author',
      [
        {
          id: '1',
          firstname: 'Charlotte',
          lastname: 'Bronte',
          bio: 'my favorite author',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          firstname: 'C.S.',
          lastname: 'Lewis',
          bio: 'author of Narnia',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          firstname: 'Dan',
          lastname: 'Brown',
          bio: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          firstname: 'R. R.',
          lastname: 'Martin',
          bio: 'author of Ice & Fire',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          firstname: 'J. K.',
          lastname: 'Rowling',
          bio: 'author of Harry Potter',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          firstname: 'J. R. R',
          lastname: 'Tolkien',
          bio: 'author of Lord of the Rings',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('author', null, {}),
};

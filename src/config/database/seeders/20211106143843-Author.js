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
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('author', null, {}),
};

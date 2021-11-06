'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'book',
      [
        {
          id: '1',
          title: 'Jane Eyre',
          isbn: '1231421251212',
          description: 'my favourite book',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          title: 'Narnia',
          isbn: '12314212251212',
          description: 'kids go to winterland',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('book', null, {}),
};

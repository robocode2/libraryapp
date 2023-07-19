'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'list',
      [
        {
          name: 'favourites seed',
          description: 'my favourites books',
          userId: '123',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('list', null, {}),
};

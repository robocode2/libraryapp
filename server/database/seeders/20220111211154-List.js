'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'list',
      [
        {
          name: 'favourites seed',
          description: 'my favourites books',
          createdAt: '2022-01-15T18:47:00.374Z',
          updatedAt: '2022-01-15T18:47:00.374Z',
          userid: 'FaAMohHFTwftFrApJnjcEt640k92',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('list', null, {}),
};

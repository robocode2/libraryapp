'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          uid: 'd3e45c12-19bf-485d-89f8-e1f9ebd120f4',
          id: '1',
          displayName: 'Rabia Abbas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {}),
};

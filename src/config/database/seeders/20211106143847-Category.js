'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'category',
      [
        {
          id: '1',
          name: 'drana',
          description: 'real world characters do real things',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'fantasy',
          description: 'imaginary worlds, creatures, and characters',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('category', null, {}),
};

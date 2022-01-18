'use strict';

const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'user',
      [
        {
          uuid: 'd3e45c12-19bf-485d-89f8-e1f9ebd120f4',
          userid: 'FaAMohHFTwftFrApJnjcEt640k92',

          displayName: 'Rabia Abbas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user', null, {}),
};

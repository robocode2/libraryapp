'use strict';

const { sequelize } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'user',
      [
        {
          password: 'FaAMohHFTwftFrApJnjcEt640k92',
          username: 'Rabia Abbas',
          email: 'rabiabbas471@gmail.com',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user', null, {}),
};

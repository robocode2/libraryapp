'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emailverified: {
        type: DataTypes.BOOLEAN,
      },
      verificationtoken: {
        type: DataTypes.STRING,
      },
      realm: {
        type: DataTypes.STRING,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('user');
  },
};

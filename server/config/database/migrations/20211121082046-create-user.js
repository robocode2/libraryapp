'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      displayName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('users');
  },
};

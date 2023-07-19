'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {}

  Entries.init(
    {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: 'entry',
      modelName: 'Entries',
    }
  );
  return Entries;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Entries.belongsTo(models.Book, {
        foreignKey: 'id',
        as: 'book',
      });
      Entries.belongsTo(models.List, {
        foreignKey: 'id',
        as: 'list',
      });
    }
  }
  Entries.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,

        type: DataTypes.INTEGER,
      },
      listId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'entries',
      modelName: 'Entries',
    }
  );
  return Entries;
};

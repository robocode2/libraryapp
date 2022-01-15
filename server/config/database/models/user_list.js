'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user_list.belongsTo(models.Book, {
        foreignKey: 'id',
        as: 'book',
      });
      user_list.belongsTo(models.List, {
        foreignKey: 'id',
        as: 'list',
      });
    }
  }
  user_list.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      listId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'user_lists',
      modelName: 'user_list',
    }
  );
  return user_list;
};

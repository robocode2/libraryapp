'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsTo(models.User, { foreignKey: 'id', as: 'userlist' });
      List.belongsToMany(models.Book, { through: 'user_lists', foreignKey: 'id', as: 'booklist_entry' });
    }
  }
  List.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, //refers to user ? default values ?
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'list',
      modelName: 'List',
    }
  );
  return List;
};

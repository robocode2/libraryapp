'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      Book.belongsToMany(models.Author, { through: 'book_authors', foreignKey: 'id', as: 'book' });
      Book.belongsToMany(models.Category, { through: 'book_categories', foreignKey: 'id', as: 'boook' });
      Book.belongsToMany(models.List, { through: 'user_lists', foreignKey: 'id', as: 'userbook' });
    }
  }
  Book.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isbn: {
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
      tableName: 'book',
      modelName: 'Book',
    }
  );
  return Book;
};

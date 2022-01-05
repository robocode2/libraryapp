'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book_category.belongsTo(models.Book, {
        foreignKey: 'id',
        as: 'book',
      });
      book_category.belongsTo(models.Category, {
        foreignKey: 'id',
        as: 'boook',
      });
    }
  }
  book_category.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'book_categories',
      modelName: 'book_categories',
    }
  );
  return book_category;
};

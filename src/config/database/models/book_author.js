'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class book_author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book_author.belongsTo(models.book, {
        foreignKey: 'id',
        as: 'book',
      });
      book_author.belongsTo(models.author, {
        foreignKey: 'id',
        as: 'author',
      });
    }
  }
  book_author.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      author_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'book_authors',
      modelName: 'book_author',
    }
  );
  return book_author;
};

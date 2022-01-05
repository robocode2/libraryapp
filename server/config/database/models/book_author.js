'use strict';
const { Model } = require('sequelize');
const Book = require('../models/book');
const Author = require('../models/author');

module.exports = (sequelize, DataTypes) => {
  class book_author extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book_author.belongsTo(models.Book, {
        foreignKey: 'id',
        as: 'book',
      }); //was ist das fur eine Kacke ?
      book_author.belongsTo(models.Author, {
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
        //references a book?
      },
      author_id: {
        type: DataTypes.STRING,
        allowNull: false,
        //references an author ?
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

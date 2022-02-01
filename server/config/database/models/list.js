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
      //User.belongsToMany(Project, { as: 'Tasks', through: 'worker_tasks', foreignKey: 'userId', otherKey: 'projectId'})

      // define association here
      //List.belongsTo(models.User, { foreignKey: 'userid', as: 'owner', targetKey: 'user_id' });
      //List.hasMany(models.Book, { through: 'entries', foreignKey: 'id', as: 'bookid', targetKey: 'bookId' });
      List.belongsToMany(models.Book, { through: 'Entries', as: 'Booklists' });
      //List.belongsTo(models.User);
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        notEmpty: true,
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

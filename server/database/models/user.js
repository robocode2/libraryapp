'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.List, { foreignKey: 'userId' });
      //User.hasOne(models.Credential, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      username: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        //unique
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      emailverified: {
        type: DataTypes.BOOLEAN,
      },
      verificationtoken: {
        type: DataTypes.STRING,
      },
      realm: {
        type: DataTypes.STRING,
      },
    
    },
    {
      sequelize,
      tableName: 'user',
      modelName: 'User',
    }
  );
  return User;
};

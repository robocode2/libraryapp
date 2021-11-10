/* const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const envConfigs = require('../config/config');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = envConfigs[env];
const db = {};

let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db; */

'use strict';
const envConfigs = require('../config/config');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
//const config = require(__dirname + '/../config/config.js')[env];
const config = envConfigs[env];
const db = {};

console.log(config.username);
console.log(config.password);
let sequelize;
if (config.use_env_variable) {
  //sequelize = new Sequelize(process.env[config.use_env_variable], config);
  sequelize = new Sequelize('app_devdb', 'postgres', 'IDnowLOV123', config);
} else {
  sequelize = new Sequelize('app_devdb', 'postgres', 'IDnowLOV123', config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

//models/index.js

const Sequelize = require('sequelize');

const sequelize = new Sequelize('app_devdb', 'postgres', 'IDnowLOV123', {
  host: 'localhost',
  dialect: 'postgres',
});

/* const sequelize = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});
 */
/* const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
}) */
module.exports = sequelize;

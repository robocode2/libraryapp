require('dotenv').config();

/* require { config } from 'dotenv';
config({ path: '../../../../.env' });
 */
module.exports = {
  development: {
    url: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    use_env_variable: 'DATABASE_URL',
    dialectOptions: { ssl: true },
    logging: false,
  },
};

/* module.exports = {
  development: {
    use_env_variable: process.env.DEV_DATABASE_URL,
    dialect: 'postgres',
  },
  test: {
    use_env_variable: process.env.TEST_DATABASE_URL,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
  },
}; */

/* module.exports = {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    database: process.env.TEST_DB_NAME,
    username: process.env.TEST_DB_USER,
    password: process.env.TEST_DB_PASSWORD,
    host: process.env.TEST_DB_HOST,
    dialect: 'postgres',
    logging: false,
  },
  production: {},
};  */

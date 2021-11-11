const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',

  password: 'IDnowLOV123',
  host: 'localhost',
  port: 5432,
  database: 'app_devdb',
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};

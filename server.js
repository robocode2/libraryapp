const app = require('./app.js');

require('dotenv').config();
const cors = require('cors');
const middleware = require('./server/middleware/index');
const express = require('express');
const sequelize = require('./server/config/database/config/dbconnection');
const { Book, User } = require('./server/config/database/models');
const { not } = require('expect');
const user = require('./server/config/database/models/user');
//const app = express();

app.use(express.json());
app.use(cors());

//app.use(middleware.decodeToken);
//app.use(middleware.findOrCreateUser);

const PORT = process.env.PORT || 8080;
/* app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
 */

app.listen(PORT, async () => {
  console.log('server is upsfsaf!');
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ force: true })
    console.log('database connected!');
  } catch (err) {
    console.log(err);
  }
});

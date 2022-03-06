require('dotenv').config();
const app = require('./app.js');
const sequelize = require('./server/database/config/dbconnection');

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}...`);

  try {
    await sequelize.authenticate();
    //await sequelize.sync({ force: true });
    console.log('database connected!');
  } catch (err) {
    console.log(err);
  }
});

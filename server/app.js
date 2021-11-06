const express = require('express');

const { sequelize } = require('./models');

const app = express();

app.use(express.json());

app.post('/books', (req, res) => {});

app.listen({ port: 4000 }, async () => {
  console.log('server is up!');
  await sequelize.sync({ force: true });
  console.log('database synced!');
});

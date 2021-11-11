require('dotenv').config();

const express = require('express');

var cors = require('cors');

/* 
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DEV_DATABASE_URL); // Example for postgres */

const sequelize = require('./src/config/database/config/dbconnection');

//const { Book, Author, Category, Book_categories, Book_authors } = require('./src/config/database/models');
const BookRouter = require('./src/book/BookRouter');

const app = express();

// Middleware

app.use(express.json());
app.use(cors());

// Routes
app.use(BookRouter);

// Init
app.listen({ port: 3001 }, async () => {
  console.log('server is up!');
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ force: true })
    console.log('database connected!');
  } catch (err) {
    console.log(err);
  }
});

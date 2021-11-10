require('dotenv').config();

const express = require('express');

var cors = require('cors');

/* 
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DEV_DATABASE_URL); // Example for postgres */

const sequelize = require('./server/config/database/config/dbconnection');

const { Book, Author, Category, Book_categories, Book_authors } = require('./server/config/database/models');

const app = express();

app.use(express.json());
app.use(cors());

// Routes

// Book routes

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    console.log(books);
    res.json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/books', async (req, res) => {
  const { title, isbn, description } = req.body; //do I need id ?

  try {
    const book = await Book.create({ title, isbn, description });

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Books
app.get('/books/:id', async (req, res) => {
  const id = req.params.id; //or by isbn?
  try {
    const book = await Book.findOne({
      where: { id },
    });

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/book/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ where: { id } });

    await book.destroy(); //onCascade?

    return res.json({ message: 'Book deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.put('/book/:id', async (req, res) => {
  //is id ok? revert to id/uuid?
  //const id = req.params.id;
  const { title, id, description } = req.body;
  try {
    const book = await Book.findOne({ where: { id } });

    book.title = title;
    book.id = id; //geht nicht!
    book.description = description;

    await Book.save();

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

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

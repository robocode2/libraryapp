const express = require('express');
const app = express();

const { Book } = require('./server/config/database/models/book');
const db = require('./db');
const sequelize = require('./server/config/database/config/dbconnection');

app.use(express.json());

app.get('/api/v1/books', async (req, res) => {
  try {
    const results = await db.query('select * from book');
    console.log(results);
  } catch (err) {
    console.log(err);
  }
});

app.get('/books', async (req, res) => {
  try {
    console.log('im heeere');
    const books = await Book.findAll();
    console.log(books);
    res.send(books);
  } catch (err) {
    res.send(err);
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

/* 
app.get('/books/:id', async (req, res) => {
  const id = req.params.id; //or by isbn?
  try {
    const book = await Book.findOne({
.0
      where: { id },
    });

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}); */

app.delete('/book/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ where: { id: id } });

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

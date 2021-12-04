require('dotenv').config();
const cors = require('cors');
const middleware = require('./server/middleware/index');
const express = require('express');
const sequelize = require('./server/config/database/config/dbconnection');
const { Book, User } = require('./server/config/database/models');
const { not } = require('expect');
const user = require('./server/config/database/models/user');
const app = express();

app.use(express.json());
app.use(cors());

app.use(middleware.decodeToken);
app.use(middleware.findOrCreateUser);

// Routes

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

// Book routes

/* app.get('api/booksss', async (req, res) => {
  try {
    console.log('good morningggggg');
    const user = await User.findOne({
      where: { displayName: username },
    });
    if (!user) {
      const useruid = req.user.uid;
      const userdisplayname = req.user.name;
      const dbuser = User.create({ useruid, userid, userdisplayname });
    }

    //console.log(user);
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}); */

app.get('/books', async (req, res) => {
  try {
    console.log(req.user.uid);
    const books = await Book.findAll();
    console.log(books);
    res.json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/books', async (req, res) => {
  const { id, title, isbn, description } = req.body; //do I need id ?yesitseems

  const date1 = new Date();
  const date2 = new Date();
  console.log(date1);
  console.log(`${id},${title},${isbn},${description}`);
  try {
    const book = await Book.create({ id, title, isbn, description, date1, date2 });

    return res.status(201).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.get('/books/:id', async (req, res) => {
  const id = req.params.id; //or by isbn?
  console.log(req.params);

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

app.delete('/books/:id', async (req, res) => {
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

app.put('/books/:id', async (req, res) => {
  //is id ok? revert to id/uuid?

  const { id, title, isbn, description } = req.body;
  try {
    const book = await Book.findOne({ where: { id } });

    book.id = id;
    book.title = title;
    book.isbn = isbn;
    book.description = description;

    await book.save();

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = app;

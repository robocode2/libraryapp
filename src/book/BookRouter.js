const express = require('express');
const router = express.Router();
const BookService = require('./BookService');
const Book = require('./Book');

router.get('/books', async (req, res) => {
  const books = await BookService.getBooks();
  res.send(books);
});
/* 
router.post('/books', async (req, res) => {
  const { title, isbn, description } = req.body; //do I need id ?

  try {
    const book = await Book.create({ title, isbn, description });

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/books/:id', async (req, res) => {
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

router.delete('/book/:id', async (req, res) => {
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

router.put('/book/:id', async (req, res) => {
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
 */
module.exports = router;

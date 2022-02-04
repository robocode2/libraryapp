const { Book } = require('../config/database/models');

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.createBook = async (req, res) => {
  const { title, isbn, description } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  try {
    const newBook = await Book.create({ title, isbn, description, createdAt, updatedAt });
    return res.status(201).json(newBook);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const errors = err.errors;
      const errorList = errors.map((e) => {
        let obj = {};
        obj[e] = e.message;
        return obj;
      });
      return res.status(400).json({
        success: false,
        msg: errorList,
      });
    } else {
      next(new ErrorResponse(`Sorry, could not save ${req.body.title}`, 404));
    }
  }
};

exports.getBook = async (req, res) => {
  const BookId = req.params.id;
  try {
    const queryBook = await Book.findOne({
      where: { id: BookId },
    });
    if (queryBook == null) {
      res.status(500).json({ error: 'This book does not exist' });
    } else {
      return res.json(queryBook);
    }
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ where: { id } });
    await book.destroy();
    return res.json({ message: 'Book deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.updateBook = async (req, res) => {
  const BookId = req.params.id;
  const { title, isbn, description } = req.body;
  try {
    const book = await Book.findOne({ where: { id: BookId } });
    book.title = title;
    book.isbn = isbn;
    book.description = description;
    await book.save();
    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

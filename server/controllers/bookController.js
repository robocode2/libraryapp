const { Book } = require('../config/database/models');

// Display list of all books.
exports.book_list = async (req, res) => {
  console.log('were her at all books');
  console.log(req.headers);
  try {
    const books = await Book.findAll();
    return res.json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.book_create_post = async (req, res) => {
  const { title, isbn, description } = req.body;

  //I should do validation here

  const date1 = new Date();
  const date2 = new Date();

  try {
    const book = await Book.create({ title, isbn, description, date1, date2 });
    return res.status(201).json(book);
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

// Handle book create on POST.
/* 
exports.book_create_post = async (req, res) => {
  const { title, isbn, description } = req.body; //do I need id ?yesitseems

  const date1 = new Date();
  const date2 = new Date();

  try {
    const book = await Book.create({ title, isbn, description, date1, date2 });

    return res.status(201).json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}; */

// Display detail page for a specific book.
exports.book_detail = async (req, res) => {
  const BookId = req.params.id; //or by isbn?
  console.log(req.params);

  try {
    const book = await Book.findOne({
      where: { id: BookId },
    });
    if (book == null) {
      res.status(500).json({ error: 'This book does not exist' });
    } else {
      return res.json(book);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle book delete on POST.
exports.book_delete_post = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Book.findOne({ where: { id } });

    await book.destroy(); //onCascade?

    return res.json({ message: 'Book deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
// Handle book update on POST.
exports.book_update_post = async (req, res) => {
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
};

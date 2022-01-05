const Book = require('./');

/* const createBook = async () => {
  const { title, isbn, description } = req.body; //do I need id ?

  try {
    const book = await Book.create({ title, isbn, description });

    return res.json(book);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
 */
const getBooks = async () => {
  try {
    const books = await Book.findAll();
    console.log(books);
    res.json(books);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const getUser = async (id) => {};

module.exports = {
  create,
  getBooks,
  getBook,
};

const { Entries } = require('../config/database/models');
const admin = require('../config/firebase/firebase-config');

const middleware = require('../middleware/auth');

exports.addBook = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  const { list_id, book_id } = req.body;
  const createdAt = new Date();
  const updatedAt = new Date();
  try {
    const newEntry = await Entries.create({ ListId: list_id, BookId: book_id, createdAt, updatedAt });
    return res.status(201).json(newEntry);
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.removeBook = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  const { list_id, book_id } = req.body;
  try {
    const book = await Entries.findOne({ where: { ListId: list_id, BookId: book_id } });
    await book.destroy();
    return res.json({ message: 'Entry deleted!' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

exports.getListEntries = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  const id = req.params.id;
  try {
    const listEntries = await Entries.findAll({ where: { ListId: id } });
    return res.status(201).json(listEntries);
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

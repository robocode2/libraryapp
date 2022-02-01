const { Entries } = require('../config/database/models');
const admin = require('../config/firebase/firebase-config');

const middleware = require('../middleware/index');

exports.list_add_book = async (req, res) => {
  const { list_id, book_id } = req.body;
  const date1 = new Date();
  const date2 = new Date();
  try {
    const bookentry = await Entries.create({ ListId: list_id, BookId: book_id, date1, date2 });
    return res.status(201).json(bookentry);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.list_remove_book = async (req, res) => {
  const { list_id, book_id } = req.body;
  try {
    const entry = await Entries.findOne({ where: { ListId: list_id, BookId: book_id } });
    await entry.destroy();
    return res.json({ message: 'Entry deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

exports.list_entries = async (req, res) => {
  const id = req.params.id;
  try {
    const entries = await Entries.findAll({ where: { ListId: id } });
    return res.status(201).json(entries);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.list_delete = async (req, res) => {
  try {
    const list_entries = list_details(req, res);

    //STEP 1 LOOP OVER LIST ENTRIES AND DELETE THEM
    //STEP 2 THIS METHOD WILL BE THE RESULT OF REMOVING LIST FROM LISTS TABLE

    return res.json({ message: 'List deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

//IF USER DELETED, REMOVE ALL RELATED LISTS.
//DO I NEED USER DELETE ACCOUNT BUTTON?
//DO I NEED USER CONTROLLERS ? USER ROUTES ?
/* exports.user_delete = async (req, res) => {
  try {
    const list_entries = list_details(req, res);

    //STEP 1 LOOP OVER LIST ENTRIES AND DELETE THEM
    //STEP 2 THIS METHOD WILL BE THE RESULT OF REMOVING LIST FROM LISTS TABLE

    return res.json({ message: 'List deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
 */

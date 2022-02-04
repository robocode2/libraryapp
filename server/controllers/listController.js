const admin = require('../../firebase-config');
const middleware = require('../middleware/auth');
const { createUser } = require('./userController');
const { List } = require('../database/models');

exports.createList = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  try {
    await createUser(req, res);
    const user_id = user.uid;
    const { name, description } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();
    const newList = await List.create({ name, description, createdAt, updatedAt, userid: user_id });
    return res.status(201).json(newList);
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

/* exports.deleteList = async (req, res) => {
  // delete list entries from User Booklist Entries
  const id = req.params.id;
  try {
    const list = await List.findOne({ where: { id } });
    //{
    //if list is null
    //}
    await list.destroy();
    return res.json({ message: 'list deleted!' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};
 */
exports.updateList = async (req, res) => {
  const { name, description } = req.body;
  try {
    const list = await List.findOne({ where: { id } });
    list.name = name;
    list.description = description;
    await List.save();
    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

exports.getUserLists = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  try {
    const userLists = await List.findAll({
      where: { userid: user.uid },
    });
    //if null
    return res.json(userLists);
  } catch (err) {
    console.log(err);
    return res.status(500).send('Something went wrong');
  }
};

exports.getListDetails = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  const list_id = req.params.id;
  try {
    const list = await List.findOne({
      where: { userid: user.uid, id: list_id },
    });
    if (list == null) {
      res.status(500).json({ error: 'This list does not exist' });
    } else {
      return res.json(list);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

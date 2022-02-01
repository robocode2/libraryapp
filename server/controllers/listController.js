const { List, User } = require('../config/database/models');
const admin = require('../config/firebase/firebase-config');

const middleware = require('../middleware/index');
const { user_create } = require('./userController');

// CALL CONSEQUENCE METHODS FROM ENTRIES_CONTROLLER

// Handle list create .
/* exports.list_create = async (req, res) => {
  const user = req['currentUser'];
  console.log('good morning honey' + user.uid);
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  try {
    const user_id = user.uid;
    const username = user.name;
    const dbUser = await User.findOne({ where: { userid: user_id } });
    if (!dbUser) {
      const newUser = await User.create({ userid: user_id, displayName: username });
      console.log(newUser);
    }
    const { name, description } = req.body;
    const date1 = new Date();
    const date2 = new Date();
    const newList = await List.create({ name, description, date1, date2, userid: user_id });
    return res.status(201).json(newList);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
 */

exports.list_create = async (req, res) => {
  const user = req['currentUser'];
  console.log('good morning honey' + user.uid);
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  try {
    await user_create(req, res);
    const { name, description } = req.body;
    const date1 = new Date();
    const date2 = new Date();
    const newList = await List.create({ name, description, date1, date2, userid: user_id });
    return res.status(201).json(newList);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Handle list delete on POST.
exports.list_delete = async (req, res) => {
  // delete list entries from User Booklist Entries
  const id = req.params.id;
  try {
    const list = await List.findOne({ where: { id } });
    await list.destroy(); //onCascade? all books that contain this tag ?
    return res.json({ message: 'list deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle list update on POST.
exports.list_update = async (req, res) => {
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

// Display list of all user's lists.
exports.lists_list = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  try {
    const lists = await List.findAll({
      where: { userid: user.uid },
    });
    return res.json(lists);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Display entries in user's specific list.
exports.list_details = async (req, res) => {
  const user = req['currentUser'];
  console.log('good morning honey' + user);
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  //name?
  const list_name = req.params.list_name; //name?
  //LIST DETAILS
  try {
    const list = await List.findOne({
      where: { userid: user.uid, name: list_name },
    });
    // ADD :
    // GRAB ALL BOOK ENTRIES WITH THAT LIST ID FROM THE 3RD DATABASE TABLE
    // COMBINE THEM INTO OBJECT AND RETURN
    // OR CREATE EXTRA ENDPOINT /lists/:listname/books
    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

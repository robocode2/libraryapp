const { List } = require('../config/database/models');
const admin = require('../config/firebase/firebase-config');

const middleware = require('../middleware/index');

// Display list of all categories.
exports.lists_list = async (req, res) => {
  try {
    const lists = await List.findAll();
    return res.json(lists);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle list create on POST.
exports.list_create_post = async (req, res) => {
  try {
    const userid = await middleware.getJWTToken(req, res);
    const { name, description } = req.body;
    const date1 = new Date();
    const date2 = new Date();
    const list = await List.create({ userid, name, description, date1, date2 });
    return res.status(201).json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Display details for a specific list.
exports.list_detail = async (req, res) => {
  const id = req.params.id; //name?
  console.log('hi good morning ');
  try {
    const list = await List.findOne({
      where: { id },
    });

    return res.json(list);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle list delete on POST.
exports.list_delete_post = async (req, res) => {
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
exports.list_update_post = async (req, res) => {
  //is id ok? revert to id/uuid?

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

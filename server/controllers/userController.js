const { User } = require('../config/database/models');

// Handle category delete on POST.
//This will need me to handle what happens when user is deleted from databse, log in, redirect, messages, etc
/* 
exports.user_delete = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne({ where: { id } });

    await category.destroy(); //onCascade? all books that contain this tag ?

    return res.json({ message: 'Category deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}; */

/* // Handle category update on POST.
exports.category_update_post = async (req, res) => {
  //is id ok? revert to id/uuid?

  const { id, name, description } = req.body;
  try {
    const category = await Category.findOne({ where: { id } });

    category.id = id;
    category.name = name;
    category.description = description;

    await category.save();

    return res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}; */

exports.user_create = async (req, res) => {
  const user = req['currentUser'];
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
      //return res.status(201).json(newUser);
    }
  } catch (err) {
    console.log(err);
    //return res.status(500).json(err);
  }
};

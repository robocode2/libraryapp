const { Category } = require('../config/database/models');

// Display list of all categories.
exports.category_list = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.json(categories);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle category create on POST.
exports.category_create_post = async (req, res) => {
  const { id, name, description } = req.body;

  const date1 = new Date();
  const date2 = new Date();

  try {
    const category = await Category.create({ id, name, description, date1, date2 });

    return res.status(201).json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// Display details for a specific Category.
exports.category_detail = async (req, res) => {
  const id = req.params.id; //name?

  try {
    const category = await Category.findOne({
      where: { id },
    });

    return res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle category delete on POST.
exports.category_delete_post = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await Category.findOne({ where: { id } });

    await category.destroy(); //onCascade? all books that contain this tag ?

    return res.json({ message: 'Category deleted!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

// Handle category update on POST.
exports.category_update_post = async (req, res) => {
  //is id ok? revert to id/uuid?

  const { id, name, description } = req.body;
  try {
    const category = await Category.findOne({ where: { id } });

    category.id = id;
    category.name = name;
    description.description = description;

    await category.save();

    return res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

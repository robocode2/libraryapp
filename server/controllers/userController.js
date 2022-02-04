const { User } = require('../database/models');

exports.createUser = async (req, res) => {
  const user = req['currentUser'];
  if (!user) {
    res.status(403).send('You must be logged in!');
  }
  try {
    const user_id = user.uid;
    const username = user.name;
    const existingUser = await User.findOne({ where: { userid: user_id } });
    if (!existingUser) {
      const newUser = await User.create({ userid: user_id, displayName: username });
    }
  } catch (err) {
    console.log(err);
  }
};

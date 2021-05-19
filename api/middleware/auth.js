const { User } = require('../db.js');

module.exports = async (req, res, next) => {
  const { user } = req.query;
  try {
    const username = await User.findByPk(user);
    if (username) {
      if (username.role === 'Admin') {
        next();
      } else {
        res.status(401).send('Access denied');
      }
    } else {
      res.status(404).send('User not exist');
    }
  } catch {
    res.status(400).send('Value must be of type UUID');
  }
};

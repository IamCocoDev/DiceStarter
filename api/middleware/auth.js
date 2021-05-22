const jwt = require('jsonwebtoken');

const accessTokenSecret = 'tomasvigilante';
const { User } = require('../db.js');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      try {
        const username = await User.findOne({ where: { name: user.name } });
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
      return null;
    });
  } else {
    res.sendStatus(401);
  }
  return null;
};

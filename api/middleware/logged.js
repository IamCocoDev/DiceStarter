const jwt = require('jsonwebtoken');

const {
  accessTokenSecret,
} = process.env;

const { User } = require('../db');

const isLogged = (req, res, next) => {
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
          next();
        } else {
          res.status(404).send('User not exist');
        }
      } catch {
        res.sendStatus(400);
      }
      return null;
    });
  } else {
    res.sendStatus(401);
  }
  return null;
};

const isNotLogged = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === undefined) {
    next();
  } else {
    res.sendStatus(401);
  }
  return null;
};

module.exports = {
  isLogged,
  isNotLogged,
};

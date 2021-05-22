const express = require('express');

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const isAdmin = require('../middleware/auth');
const { isNotLogged } = require('../middleware/logged');

const {
  accessTokenSecret,
} = process.env;

const router = express.Router();

const { User } = require('../db');

router.get('/:id', isAdmin, (req, res, next) => {
  User.findByPk(req.params.id)
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

router.post('/signup', isNotLogged, (req, res, next) => {
  const id = uuidv4();
  let { password } = req.body;
  const {
    name,
    firstName,
    lastName,
    birthday,
    country,
    email,
  } = req.body;
  const today = new Date();
  const birth = new Date(birthday);
  const currentYear = today.getFullYear();
  const birthYear = birth.getFullYear();
  if (currentYear - birthYear < 13) return res.send('Must be over 13 years old');
  if (currentYear - birthYear > 100) return res.send('The maximum age is 100 years');
  bcrypt.hash(password, 10, (err, hash) => {
    password = hash;
    if (err) {
      next(err);
    }
    const newUser = {
      id,
      name,
      firstName,
      lastName,
      birthday,
      country,
      email,
      password,
    };
    User.create(newUser).then((info) => { res.send(info); })
      .catch((e) => {
        res.status(400);
        next(e);
      });
  });
  return null;
});

router.post('/signin', isNotLogged, async (req, res, next) => {
  const { username, password } = req.body;
  try {
    let user;
    const emailRegEx = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    if (username && password) {
      if (emailRegEx.test(username)) {
        user = await User.findOne({ where: { email: username } });
      }
      user = await User.findOne({ where: { name: username } });
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.send('password invalid');
        if (result) {
          const accessToken = jwt.sign({
            name: user.name,
            role: user.role,
          }, accessTokenSecret);
          return res.send({
            user: user.dataValues,
            token: accessToken,
          });
        }
        return res.send('User not found');
      });
    }
    if (!password || !username) {
      return res.send('Input invalid');
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
  return null;
});

router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.send('Logout successful');
});

router.post('/admin', isAdmin, (req, res, next) => {
  const id = uuidv4();
  try {
    let { password } = req.body;
    const {
      name,
      firstName,
      lastName,
      birthday,
      country,
      email,
    } = req.body;
    const role = 'Admin';
    bcrypt.hash(password, 10, (err, hash) => {
      password = hash;
      if (err) {
        next(err);
      }
      const newUser = {
        id,
        name,
        firstName,
        lastName,
        birthday,
        country,
        email,
        role,
        password,
      };
      User.create(newUser).then((info) => res.send(info))
        .catch((error) => next(error));
    });
  } catch (e) {
    res.status(400);
    next(e);
  }
});

router.put('/:id', isAdmin, (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    User.findByPk(id)
      .then((response) => {
        response.update(body, { where: { id } });
      }).catch((e) => next(e));
  } catch (err) {
    res.status(400);
    next(err);
  }
});

router.put('/:id/updatePassword', (req, res, next) => {
  const { id } = req.params;
  let { password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    password = hash;
    if (err) {
      next(err);
    }
    req.body.password = password;
    User.findByPk(id)
      .then((response) => {
        response.update({ password }, { where: { id } })
          .then(() => res.send('Password Update'));
      }).catch((e) => next(e));
  });
});

module.exports = router;

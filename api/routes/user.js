const express = require('express');

const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const bcrypt = require('bcrypt');

const { User } = require('../db');

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id)
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

router.post('/signup', (req, res, next) => {
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
      .catch((error) => next(error));
  });
  return null;
});

router.post('/signin', async (req, res, next) => {
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
          return res.send(user);
        }
        return res.send('User not found');
      });
    }
    if (!password || !username) {
      return res.send('Input invalid');
    }
  } catch (e) {
    next(e);
  }
  return null;
});

router.post('/logout', (req, res) => {
  res.clearCookie('userId');
  res.send('Logout successful');
});

router.post('/admin', (req, res, next) => {
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
    next(e);
  }
});

router.put('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    let { password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
      password = hash;
      if (err) {
        next(err);
      }
      req.body.password = password;
      User.findByPk(id)
        .then((response) => {
          response.update(body, { where: { id } });
        }).catch((e) => next(e));
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

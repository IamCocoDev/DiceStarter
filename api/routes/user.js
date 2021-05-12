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

router.post('/', async (req, res, next) => {
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
      User.create(newUser).then((info) => res.send(info))
        .catch((error) => next(error));
    });
  } catch (e) {
    next(e);
  }
});

router.post('/admin', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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

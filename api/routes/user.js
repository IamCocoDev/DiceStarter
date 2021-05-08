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
      User.create(newUser).then((info) => { info.addRole(1); res.send(info); })
        .catch((error) => next(error));
    });
  } catch (e) {
    next(e);
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  User.update(body, { where: { id } })
    .then((result) => {
      res.json(result);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

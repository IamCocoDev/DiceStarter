const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const { User } = require('../db');

/* GET users listing. */
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
  const status = 'Active';

  try {
    const {
      name,
      firstName,
      lastName,
      birthday,
      profilePicture,
      address,
      city,
      postalCode,
      phone,
      country,
      email,
      password,
    } = req.body;

    const newUser = {
      id,
      name,
      firstName,
      lastName,
      birthday,
      profilePicture,
      address,
      city,
      postalCode,
      phone,
      country,
      email,
      password,
      status,
    };
    const info = await User.create(newUser);
    res.json(info);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  User.update(body, { where: { id } })
    .then((result) => {
      res.json(result);
    });
});

module.exports = router;

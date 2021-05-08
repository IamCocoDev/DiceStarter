const express = require('express');

const router = express.Router();

const { User, Role } = require('../db');

router.get('/', (req, res, next) => {
  User.findAll({ include: Role })
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

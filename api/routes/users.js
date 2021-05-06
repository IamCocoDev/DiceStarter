const express = require('express');

const router = express.Router();

const { User } = require('../db')

/* GET users listing. */
router.get('/', (req, res, next) => {
  User.findAll()
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

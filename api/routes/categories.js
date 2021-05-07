const express = require('express');

const router = express.Router();

const { Category } = require('../db');

router.get('/', (req, res, next) => {
  Category.findAll()
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

const express = require('express');

const router = express.Router();

const { Product } = require('../db')

/* GET users listing. */
router.get('/', (req, res, next) => {
  Product.findAll()
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

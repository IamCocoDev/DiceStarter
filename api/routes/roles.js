const express = require('express');

const router = express.Router();

const { Role } = require('../db');

router.get('/', (req, res, next) => {
  Role.findAll()
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

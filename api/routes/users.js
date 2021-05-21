const express = require('express');

const router = express.Router();
const isAdmin = require('../middleware/auth');

const { User, Role } = require('../db');

router.get('/', isAdmin, (req, res, next) => {
  console.log(req.headers);
  User.findAll({ include: Role })
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      res.status(400);
      next(e);
    });
});

module.exports = router;

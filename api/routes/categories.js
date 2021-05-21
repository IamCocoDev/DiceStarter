const express = require('express');
const isAdmin = require('../middleware/auth');

const router = express.Router();

const { Category } = require('../db');

router.get('/', (req, res, next) => {
  Category.findAll()
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      res.status(400);
      next(e);
    });
});

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = { name };
    const info = await Category.create(newCategory);
    res.status(200).json(info);
  } catch (e) {
    res.status(400);
    next(e);
  }
});

router.put('/:name', isAdmin, (req, res, next) => {
  const { name } = req.params;
  const { body } = req;
  Category.update(body, { where: { name } })
    .then((result) => {
      res.json(result);
    }).catch((e) => {
      res.status(400);
      next(e);
    });
});

router.delete('/:name', isAdmin, (req, res) => {
  const { name } = req.params;
  Category.destroy({ where: { name } })
    .then(() => {
      res.status(200).json({ msg: 'Cateogry deleted' });
    })
    .catch(() => res.status(404));
});

module.exports = router;

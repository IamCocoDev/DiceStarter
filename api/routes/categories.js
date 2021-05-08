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

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = { name };
    const info = await Category.create(newCategory);
    res.status(200).json(info);
  } catch (e) {
    next(e);
  }
});

router.put('/:name', (req, res, next) => {
  const { name } = req.params;
  const { body } = req;
  Category.update(body, { where: { name } })
    .then((result) => {
      res.json(result);
    }).catch((e) => {
      next(e);
    });
});

router.delete('/:name', (req, res) => {
  const { name } = req.params;
  Category.destroy({ where: { name } })
    .then(() => {
      res.status(200).json({ msg: 'Cateogry deleted' });
    })
    .catch(() => res.status(404));
});

module.exports = router;

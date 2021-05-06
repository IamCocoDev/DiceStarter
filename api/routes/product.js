const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const { Product } = require('../db');

/* GET users listing. */
router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

router.post('/', async (req, res, next) => {
  const id = uuidv4();

  try {
    const {
      name, size, color, available, picture, price, stock, rating, description,
    } = req.body;

    const newProduct = {
      id, name, size, color, available, picture, price, stock, rating, description,
    };
    const info = await Product.create(newProduct);
    res.json(info);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Product.update(body, { where: { id } })
    .then((result) => {
      res.json(result);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'product deleted' });
    })
    .catch(() => res.status(404));
});

module.exports = router;

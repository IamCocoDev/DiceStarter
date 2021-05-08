const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const { Product, Category } = require('../db');

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id, { include: Category })
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
      name, size, color, available, picture, price, stock, rating, description, categories,
    } = req.body;

    const newProduct = {
      id, name, size, color, available, picture, price, stock, rating, description,
    };
    const info = await Product.create(newProduct);
    info.setCategories(categories);
    res.status(200).json(info);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const product = await Product.findByPk(id, { include: Category });
    await product.update(body, { where: { id }, include: Category });
    product.setCategories(body.categories);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Product deleted' });
    })
    .catch(() => res.status(404));
});

module.exports = router;

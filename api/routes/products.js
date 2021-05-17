const express = require('express');

const router = express.Router();

const { Op } = require('sequelize');

const { Product, Category } = require('../db');

function onOrder(param, array) {
  switch (param) {
    case 'A-Z': return array.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });
    case 'Z-A': return array.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (b.name < a.name) return -1;
      return 0;
    });
    case 'minPrice': return array.sort((a, b) => (
      a.price - b.price
    ));
    case 'maxPrice': return array.sort((a, b) => (
      b.price - a.price
    ));
    case 'minRating': return array.sort((a, b) => (
      a.rating - b.rating
    ));
    case 'maxRating': return array.sort((a, b) => (
      b.rating - a.rating
    ));
    default: return array;
  }
}

router.get('/', (req, res, next) => {
  const {
    page, filter, order, name,
  } = req.query;
  if (filter !== '') {
    Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [{ model: Category, where: { name: { [Op.like]: `%${filter}%` } }, attributes: ['id', 'name'] }],
    })
      .then((response) => {
        if (order !== '') {
          onOrder(order, response);
        }
        return res.json({
          products: response.slice((page - 1) * 9, page * 9),
          totalPages: Math.ceil(response.length / 9),
        });
      }).catch((e) => {
        res.status(400);
        next(e);
      });
  }
  if (filter === 'All') {
    Product.findAll({
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [{ model: Category, attributes: ['id', 'name'] }],
    })
      .then((response) => {
        if (order !== '') {
          onOrder(order, response);
        }
        return res.json({
          products: response.slice((page - 1) * 9, page * 9),
          totalPages: Math.ceil(response.length / 9),
        });
      }).catch((e) => {
        res.status(400);
        next(e);
      });
  }
});
module.exports = router;

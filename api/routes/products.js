const express = require('express');

const router = express.Router();

const { Product, Category } = require('../db');

function onOrder(param, array) {
  switch (param) {
    case 'A - Z': return array.sort((a, b) => {
      if (a.name < b.name) return 1;
      if (b.name < a.name) return -1;
      return 0;
    });
    case 'Z - A': return array.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (b.name > a.name) return -1;
      return 0;
    });
    case 'minPrice': return array.sort((a, b) => {
      if (a.price < b.price) return 1;
      if (b.price < a.price) return -1;
      return 0;
    });
    case 'maxPrice': return array.sort((a, b) => {
      if (a.price > b.price) return 1;
      if (b.price > a.price) return -1;
      return 0;
    });
    case 'minRating': return array.sort((a, b) => {
      if (a.rating < b.rating) return 1;
      if (b.rating < a.rating) return -1;
      return 0;
    });
    case 'maxRating': return array.sort((a, b) => {
      if (a.rating < b.rating) return 1;
      if (b.rating < a.rating) return -1;
      return 0;
    });
    default: return array;
  }
}

router.get('/', (req, res, next) => {
  const { page, filter, order } = req.query;
  Product.findAll({ include: Category })
    .then((response) => {
      if (order) {
        onOrder(order, response);
      }
      if (filter) {
        const filtered = response.filter((p) => p.category === filter);
        return res.json(filtered.slice((page - 1) * 10, page * 10));
      }
      return res.json(response.slice((page - 1) * 10, page * 10));
    }).catch((e) => {
      next(e);
    });
});
module.exports = router;

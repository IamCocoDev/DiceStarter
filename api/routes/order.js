const express = require('express');

const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const { Order } = require('../db');

router.get('/', (req, res, next) => {
  Order.findAll()
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

router.post('/', async (req, res, next) => {
  const id = uuidv4();
  const status = 'Active';

  try {
    const {
      number,
      orderDate,
      fulfilled,
      paid,
      paymentDate,
      shippingAddress,
      shippingCountry,
      shippingCity,
      shippingPostalCode,
      price,
      quantity,
    } = req.body;

    const newProduct = {
      id,
      number,
      orderDate,
      fulfilled,
      paid,
      paymentDate,
      shippingAddress,
      shippingCountry,
      shippingCity,
      shippingPostalCode,
      price,
      quantity,
      status,
    };
    const info = await Order.create(newProduct);
    res.json(info);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', (req, res, next) => {
  Order.findByPk(req.params.id)
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

module.exports = router;

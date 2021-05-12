const express = require('express');

const router = express.Router();

const {
  User, Order, Productsxorders, Product,
} = require('../db.js');

router.get('/status/:status', (req, res) => {
  const { status } = req.params;
  if (status === 'allorders') {
    Order.findAll({ include: User }).then((data) => res.send(data));
  } else {
    Order.findAll({ where: { status }, include: User }).then((result) => {
      res.send(result);
    });
  }
});

router.get('/id/:idOrder', (req, res) => {
  const { idOrder } = req.params;
  Order.findAll({ where: { id: idOrder } }).then((data) => {
    res.send(data);
  })
    .catch(() => { res.status(404).send('ERROR'); });
});

// GET A LAS ORDENES QUE TENGAN ESE PRODUCTO
router.get('/ORDD/:idProd', (req, res) => {
  const { idProd } = req.params;
  Productsxorders.findAll({ where: { product_id: idProd } })
    .then((data) => {
      res.send(data);
    }).catch((error) => res.send(error));
});

// GET A LAS ORDENES QUE TENGAN ESE PRODUCTO
router.get('/products/:idOrder', (req, res) => {
  const { idOrder } = req.params;
  Order.findOne({ where: { id: idOrder }, include: Product })
    .then((data) => {
      res.send(data);
    }).catch((error) => res.send(error));
});

router.delete('/orderdelete/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  Productsxorders.destroy({
    where: {
      order_id: orderId, product_id: productId,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((err) => res.send(err));
});
module.exports = router;

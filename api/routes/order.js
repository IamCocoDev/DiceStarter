const express = require('express');

const router = express.Router();

const {
  User, Order, Productxorder, Product,
} = require('../db.js');

// POST UNA ORDEN

router.post('/:idUser/cart', (req, res, next) => {
  const { idUser } = req.params;
  const { body } = req;
  Order.findAll({ where: { userId: idUser, status: 'Created' } }).then(
    (ord) => {
      if (ord.length) {
        Product.findByPk(body.id).then((producto) => {
          producto.addOrder(ord);
          return res.status(200).json(body);
        }).catch((err) => res.send(err));
      } else {
        Order.create({
          address: body.address,
          price: body.price, // Cambiar modelo, esto no debe ser obligatorio, luego borrar linea
        }).then((order) => {
          User.findByPk(idUser)
            .then((user) => {
              order.setUser(user);
              Product.findByPk(body.id).then((producto) => {
                producto.addOrder(order);
                res.status(200).json(body);
              });
            })
            .catch(() => {
              res.status(404).send('Error. Order no created!');
            });
        });
      }
    },
  ).catch((e) => {
    res.status(400);
    next(e);
  });
});

router.get('/search/user/:userId/', (req, res) => {
  const { userId } = req.params;
  Order.findAll({ where: { userId, status: 'Created' }, include: { model: Product } })
    .then((data) => {
      res.send(data);
    }).catch((error) => res.send(error));
});

// GET A ORDER POR STATUS

router.get('/status/:status', (req, res, next) => {
  const { status } = req.params;
  if (status === 'allorders') {
    Order.findAll({ include: User }).then((data) => res.send(data));
  } else {
    Order.findAll({ where: { status } }).then((result) => {
      res.send(result);
    }).catch((e) => {
      res.status(400);
      next(e);
    });
  }
});

// GET A UNA ORDEN EN PARTICULAR
router.get('/search/:idOrder', (req, res) => {
  const { idOrder } = req.params;
  Order.findOne({ where: { id: idOrder }, include: Product }).then((data) => {
    Productxorder.sum('total_price', {
      where: {
        orderId: idOrder,
      },
    }).then((sum) => res.json({
      order: {
        id: data.id,
        status: data.status,
        address: data.address,
        userId: data.userId,
        products: data.products,
      },
      totalPrice: sum,
    }));
    // res.send({ order: data, price: data.price });
  })
    .catch(() => { res.status(404).send('ERROR'); });
});

// GET A LAS ORDENES QUE TENGAN ESE PRODUCTO

router.get('/searchorder/:idProd', (req, res) => {
  const { idProd } = req.params;
  Productxorder.findAll({ where: { productId: idProd } })
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

// DELETE A LA RELACION PRODUCT/ORDER

router.delete('/orderdelete/:orderId/:productId', (req, res) => {
  const { orderId, productId } = req.params;
  Productxorder.destroy({
    where: {
      orderId, productId,
    },
  })
    .then(() => res.sendStatus(200))
    .catch((err) => res.send(err));
});

router.delete('/:userId/cart', (req, res, next) => {
  const { userId } = req.params;
  Order.destroy({
    where: {
      status: 'Created',
      userId,
    },
  })
    .then(() => res.status(200).send('Order delete'))
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

router.post('/:idUser/c/cart', (req, res, next) => {
  const { idUser } = req.params;
  const { body } = req; // Recibe amount y total_price por body. y el ID del producto
  Order.findAll({ where: { userId: idUser, status: 'Created' } })
    .then((orden) => {
      const idOrder = orden[0].id;
      for (let i = 0; i < body.length; i += 1) {
        if (body[i].amount) {
          const obj = {
            id: body[i].id,
            amount: body[i].amount,
            total_price: body[i].total_price * body[i].amount,
          };
          Productxorder.update(obj, {
            where: { productId: body[i].id, orderId: idOrder },
          }).then(() => {
            res.status(200).json(obj);
          }).catch((e) => next(e));
        }
        return null;
      }
      return null;
    })
    .catch(() => res.status(400).send('ERROR. Order has not been complete'));
});

router.post('/:idUser/update/cart', (req, res) => {
  const { idUser } = req.params;
  const { body } = req; // recibe por body: satatus: processing  y direccion, cancelled , complete;
  if (req.body.status === 'Canceled' || req.body.status === 'In process' || req.body.status === 'Complete') {
    Order.update(body, { where: { userId: idUser, status: 'Created' } }).then(
      (data) => {
        if (data[0]) {
          res.status(200).send('Order has been updated');
        } else {
          res.status(404).send('You do not have an order created');
        }
      },
    );
  }
});

module.exports = router;

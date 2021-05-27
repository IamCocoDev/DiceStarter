const express = require('express');

const isAdmin = require('../middleware/auth');

const router = express.Router();
const { transporter } = require('../configs/mailer');
const templateorder = require('./emails/emailOrder.js');

const {
  User, Order, Productxorder, Product,
} = require('../db');

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

router.post('/:idUser/invited/cart', (req, res) => {
  const { idUser } = req.params; // Id del usuario
  const { body } = req; // 2 propiedades(products: array de id de productos [1,2,3] y address)
  Order.findAll({ where: { userId: idUser, status: 'Created' } }).then(
    (ord) => {
      if (ord.length) {
        for (let i = 0; i < body.products.length; i += 1) {
          Product.findByPk(body.products[i]).then((producto) => {
            producto.addOrder(ord);
          });
        }
        return res.status(200).send('Order created');
      }
      // El usuario no tiene orden, creo la orden primero y luego anado el producto.
      Order.create({
        status: 'Created',
        address: body.address,
      }).then((order) => {
        User.findByPk(idUser)
          .then((user) => {
            order.setUser(user);
            for (let i = 0; i < body.products.length; i += 1) {
              Product.findByPk(body.products[i]).then((producto) => {
                producto.addOrder(order);
              });
            }
            res.status(200).send('Order created');
          })
          .catch(() => {
            res.status(404).send('Error. Order no created!');
          });
      });
    },
  );
});

router.get('/search/user/:userId/', (req, res) => {
  const { userId } = req.params;
  Order.findAll({ where: { userId }, include: { model: Product } })
    .then((data) => {
      res.send(data);
    }).catch((error) => res.send(error));
});

// GET A ORDER POR STATUS

router.get('/status/:status', isAdmin, (req, res, next) => {
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
router.get('/search/:idOrder', isAdmin, (req, res) => {
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

router.get('/searchorder/:idProd', isAdmin, (req, res) => {
  const { idProd } = req.params;
  Productxorder.findAll({ where: { productId: idProd } })
    .then((data) => {
      res.send(data);
    }).catch((error) => res.send(error));
});

// GET A LAS ORDENES QUE TENGAN ESE PRODUCTO

router.get('/products/:idOrder', isAdmin, (req, res) => {
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

router.post('/:idUser/update/cart', (req, res, next) => {
  const { idUser } = req.params;
  const { body } = req; // recibe por body: satatus: In process, Canceled , Complete;
  // eslint-disable-next-line no-console
  console.log('BODY EN ESTA RUTA: ', body);
  if (req.body.status === 'Canceled' || req.body.status === 'In process' || req.body.status === 'Complete') {
    Order.update(body, { where: { userId: idUser, status: 'Created' } }).then(
      (data) => {
        if (data[0]) {
          res.status(200).send('Order has been updated');
        } else {
          res.status(404).send('You do not have an order created');
        }
      },
    )
      .catch((err) => next(err));
  }
});

router.post('/:idUser/invited/cart', (req, res) => {
  const { idUser } = req.params; // Id del usuario
  const { body } = req; // 2 propiedades(products: array de id de productos [1,2,3] y address)
  Order.findAll({ where: { userId: idUser, status: 'Created' } }).then(
    (ord) => {
      if (ord.length) {
        for (let i = 0; i < body.products.length; i += 1) {
          Product.findByPk(body.products[i]).then((producto) => {
            producto.addOrder(ord);
            return res.status(200).send('Order created');
          });
        }
      } else {
        // El usuario no tiene orden, creo la orden primero y luego anado el producto.
        Order.create({
          status: 'Created',
          address: body.address,
        }).then((order) => {
          User.findByPk(idUser)
            .then((user) => {
              order.setUser(user);
              for (let i = 0; i < body.products.length; i += 1) {
                Product.findByPk(body.products[i]).then((producto) => {
                  producto.addOrder(order);
                  res.status(200).send('Order created');
                });
              }
            })
            .catch(() => {
              res.status(404).send('Error. Order no created!');
            });
        });
      }
    },
  );
});

router.post('/sendorder/:first/:last/:email', async (req, res, next) => {
  const { first } = req.params;
  const { last } = req.params;
  const { email } = req.params;
  const { body } = req;
  const { totalPrice } = body;
  const htmlorder = templateorder(first, last, totalPrice);

  await transporter.sendMail({
    from: '"DiceStarter 👻" <dicestarter@gmail.com>', // sender address
    to: email, // list of receivers
    subject: 'Successful purchase ✔', // Subject line
    html: htmlorder, // html body
  })
    .catch((err) => next(err));
  res.send('Sending e-mail');
});

module.exports = router;

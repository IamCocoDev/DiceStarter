/* eslint-disable no-unused-vars */
const express = require('express');

const { isLogged } = require('../middleware/logged');

const router = express.Router();
const { transporter } = require('../configs/mailer');
const template = require('./emails/emailNewProduct');

const {
  Product, User, Wishlist, Category,
} = require('../db');

router.get('/:id', async (req, res, next) => {
  const wishlist = await Wishlist.findOne({ where: { userId: req.params.id } });
  if (wishlist && wishlist.length > 0) {
    wishlist.products.map((p) => Product.findByPk(p, { include: Category })
      .then((response) => {
        res.json(response);
      }).catch((e) => {
        res.status(400);
        next(e);
      }));
  } else {
    res.send('no wishlist for this user');
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { products, user } = req.body;
    const newWishlist = { products };
    const info = await Wishlist.findOne({ where: { userId: user } });
    if (info) {
      info.update({ products }, { where: { userId: user } })
        .then((response) => {
          res.send('Wishlist updated');
        })
        .catch((e) => next(e));
    } else {
      const wishlist = await Wishlist.create(newWishlist);
      const userInfo = await User.findByPk(user);
      wishlist.setUser(userInfo);
      res.send(wishlist);
    }
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Wishlist.destroy({ where: { userId: id } })
    .then((response) => res.send('Wishlist deleted'))
    .catch((e) => next(e));
});

module.exports = router;

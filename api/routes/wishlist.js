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
  const wishlist = await Wishlist.findOne({
    include: [
      { model: User, where: { id: req.params.id }, attributes: ['id'] }],
  });
  if (wishlist.length > 0) {
    wishlist.products.map((p) => Product.findByPk(p, { include: Category })
      .then((response) => {
        res.json(response);
      }).catch((e) => {
        res.status(400);
        next(e);
      }));
  }
});

router.post('/', isLogged, async (req, res, next) => {
  const { products, user } = req.body;
  const wishlist = Wishlist.create(products);
  wishlist.setUser(user);
  res.send(wishlist);
});

module.exports = router;

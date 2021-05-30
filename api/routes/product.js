const express = require('express');

const { v4: uuidv4 } = require('uuid');
const isAdmin = require('../middleware/auth');
const { isLogged } = require('../middleware/logged');

const router = express.Router();
const { transporter } = require('../configs/mailer');
const template = require('./emails/emailNewProduct');

const {
  Product, Category, Reviews, User,
} = require('../db');

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id, { include: [{ model: Category }, { model: Reviews }] })
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      res.status(400);
      next(e);
    });
});

router.post('/', isAdmin, async (req, res, next) => {
  const id = uuidv4();

  try {
    const {
      name, size, color, picture, price, stock, description, categories,
    } = req.body;
    const newProduct = {
      id, name, size, color, picture, price, stock, description,
    };
    if (typeof (categories[0]) !== 'number') return res.send('You must send a value as ID');
    const info = await Product.create(newProduct);
    info.setCategories(categories).then().catch((e) => next(e));
    User.findAll({ where: { subscriber: 'true' } })
      .then(async (users) => {
        for (let i = 0; i < users.length; i += 1) {
          if (users[i].dataValues.subscriber === 'true') {
            // eslint-disable-next-line no-await-in-loop
            await transporter.sendMail({
              from: '"DiceStarter 👻" <dicestarter@gmail.com>', // sender address
              to: users[i].dataValues.email, // list of receivers
              subject: 'Check it this new product ✔', // Subject line
              html: template(users[i].dataValues.firstName,
                users[i].dataValues.lastName,
                picture[0]), // html body
            });
          }
        }
      }).catch((e) => next(e));
    res.status(200).json(info);
  } catch (e) {
    res.status(400);
    next(e);
  }
  return null;
});

router.put('/stock/:productId', async (req, res, next) => {
  const { product } = req.body;
  try {
    const productUpdated = await Product.findByPk(product.id);
    await productUpdated.update(product);
    res.send(productUpdated);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { body } = req;
    if (typeof (body.categories[0]) !== 'number') return res.send('You must send a value as ID');
    const product = await Product.findByPk(id, { include: Category });
    if (body.discount !== product.discount) {
      User.findAll({ where: { subscriber: 'true' } })
        .then(async (users) => {
          for (let i = 0; i < users.length; i += 1) {
            if (users[i].dataValues.subscriber === 'true') {
            // eslint-disable-next-line no-await-in-loop
              await transporter.sendMail({
                from: '"DiceStarter 👻" <dicestarter@gmail.com>', // sender address
                to: users[i].dataValues.email, // list of receivers
                subject: 'Check it this new discount ✔', // Subject line
                text: `${users[i].dataValues.firstName} check it this new discount`, // html body
              });
            }
          }
        }).catch((e) => next(e));
    }
    await product.update(body, { where: { id }, include: Category });
    product.setCategories(body.categories).then().catch((e) => next(e));
    res.send(product);
  } catch (err) {
    res.status(400);
    next(err);
  }
  return null;
});

router.delete('/:id', isAdmin, (req, res, next) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Product deleted' });
    })
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

// ADD REVIEWS

router.post('/:id/review', isLogged, (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;
  const { rating } = req.body;
  const { comment } = req.body;

  Reviews.create({
    rating,
    comment,
    productId: id,
  })
    .then((r) => {
      Product.findByPk(id)
        .then(async (resp) => {
          const sumReviews = await Reviews.sum('rating', { where: { productId: id } });
          const quantityRev = await Reviews.count({ where: { productId: id } });
          const average = sumReviews / quantityRev;
          resp.update({ rating: parseFloat(average.toFixed(2)) });
        });
      User.findByPk(userId)
        .then((u) => {
          r.setUser(u);
          res.send(r); // El resultado del POST!!!
        })
        .catch((e) => {
          next(e);
        });
    });
});

router.get('/reviews/allreviews', isAdmin, (req, res, next) => {
  Reviews.findAll({ attributes: { exclude: ['userId'] }, include: { model: User, attributes: ['name', 'id'] } })
    .then((data) => res.status(200).send(data))
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

router.put('/review/:idReview', (req, res, next) => {
  const { idReview } = req.params;
  const { comment } = req.body;
  const { rating } = req.body;
  Reviews.findOne({ where: { id: idReview } })
    .then((resp) => {
      if (resp) {
        resp.update({ comment });
        resp.update({ rating });
      }
      res.send(resp); // Resultado del UPDATE
    })
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

router.delete('/review/:idReview', isLogged, (req, res, next) => {
  const { idReview } = req.params;
  Reviews.destroy({ where: { id: idReview } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

router.get('/:id/review', (req, res, next) => {
  const { id } = req.params;
  try {
    Reviews.findAll({ attributes: { exclude: ['userId'] }, where: { productId: id }, include: { model: User, attributes: ['name', 'id'] } })
      .then(async (resp) => {
        const sumReviews = await Reviews.sum('rating', { where: { productId: id } });
        const quantityRev = await Reviews.count({ where: { productId: id } });
        const average = sumReviews / quantityRev;
        res.send({
          all: resp,
          average: parseFloat(average.toFixed(2)),
        });
      })
      .catch((e) => {
        res.sendStatus(400);
        next(e);
      });
  } catch {
    res.sendStatus(400);
  }
});

module.exports = router;

const express = require('express');

const { v4: uuidv4 } = require('uuid');
const isAdmin = require('../middleware/auth');

const router = express.Router();

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
    const info = await Product.create(newProduct);
    info.setCategories(categories);
    res.status(200).json(info);
  } catch (e) {
    res.status(400);
    next(e);
  }
});

router.put('/:id', isAdmin, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const product = await Product.findByPk(id, { include: Category });
    await product.update(body, { where: { id }, include: Category });
    product.setCategories(body.categories);
    res.send(product);
  } catch (err) {
    res.status(400);
    next(err);
  }
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

router.post('/:id/review', (req, res, next) => {
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
  Reviews.findAll({ attributes: { exclude: ['userId'] }, include: { model: User, attributes: ['name'] } })
    .then((data) => res.send(data))
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

router.post('/review/:idReview', (req, res, next) => {
  const { idReview } = req.params;
  const { comments } = req.body;
  const { rating } = req.body;
  Reviews.findOne({ where: { id: idReview } })
    .then((resp) => {
      if (resp) {
        resp.update({ comments });
        resp.update({ rating });
      }
      res.send(resp); // Resultado del UPDATE
    })
    .catch((e) => {
      res.status(400);
      next(e);
    });
});

router.delete('/review/:idReview', isAdmin, (req, res, next) => {
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
    Reviews.findAll({ attributes: { exclude: ['userId'] }, where: { productId: id }, include: { model: User, attributes: ['name'] } })
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

const express = require('express');

const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const {
  Product, Category, Reviews, User,
} = require('../db');

router.get('/:id', (req, res, next) => {
  Product.findByPk(req.params.id, { include: [{ model: Category }, { model: Reviews }] })
    .then((response) => {
      res.json(response);
    }).catch((e) => {
      next(e);
    });
});

router.post('/', async (req, res, next) => {
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
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const product = await Product.findByPk(id, { include: Category });
    await product.update(body, { where: { id }, include: Category });
    product.setCategories(body.categories);
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Product.destroy({ where: { id } })
    .then(() => {
      res.status(200).json({ msg: 'Product deleted' });
    })
    .catch((e) => {
      next(e);
    });
});

// ADD REVIEWS

router.post('/:id/review', (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const { rating } = req.body;
  const { comment } = req.body;
  Reviews.create({
    rating,
    comment,
    productId: id,
  })
    .then((r) => {
      User.findOne({ where: { name } })
        .then((u) => {
          r.setUser(u);
          res.send(r); // El resultado del POST!!!
        })
        .catch((e) => {
          next(e);
        });
    });
});

router.get('/reviews/allreviews', (req, res, next) => {
  Reviews.findAll()
    .then((data) => res.send(data))
    .catch((e) => {
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
      next(e);
    });
});

router.delete('/review/:idReview', (req, res, next) => {
  const { idReview } = req.params;

  Reviews.destroy({ where: { id: idReview } })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((e) => {
      next(e);
    });
});

router.get('/:id/review', (req, res, next) => {
  const { id } = req.params;

  Reviews.findAll({ where: { productId: id } })
    .then((resp) => {
      res.send(resp);
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;

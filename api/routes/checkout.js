const express = require('express');
const mercadopago = require('mercadopago');

const router = express.Router();

mercadopago.configure({
  access_token: 'TEST-615243928937713-060302-cf374f1b1f043ab19a15741b6490b238-216891194',
});

router.post('/', (req, res, next) => {
  const { products } = req.body;
  const productsToMp = products.map((item) => ({
    title: item.name,
    unit_price: Number(item.price),
    quantity: Number(item.amount),
  }));

  const preference = {
    items: productsToMp,
    back_urls: {
      success: 'http://localhost:3000/home',
      failure: 'http://localhost:3000/home',
      pending: 'http://localhost:3000/home',
    },
    auto_return: 'approved',
  };

  mercadopago.preferences.create(preference)
    .then((response) => res.send(response.body))
    .catch((err) => next(err));
});

module.exports = router;

// collection_id=1237013880 &
// collection_status=approved &
//   payment_id=1237013880 &
//     status=approved &
//   external_reference=null &
//   payment_type=credit_card &
//   merchant_order_id=2708119985 &
//   preference_id=184851111 - 280d5e2d - 74be - 4c0a - bdcc - 77e5fcb9ffab &
//   site_id=MLA &
//   processing_mode=aggregator &
//     merchant_account_id=null

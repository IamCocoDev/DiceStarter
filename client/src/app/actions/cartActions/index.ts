/* eslint-disable max-len */
import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';

export const GET_PRODUCTS_IN_CART = 'GET_PRODUCTS_IN_CART';
export const ADD_PRODUCT_IN_CART = 'ADD_PRODUCT_IN_CART';
export const DELETE_ALL_CART = 'DELETE_ALL_CART';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY';


export const getProductsInCart = (idUser = '') => (dispatch) => {
  const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (idUser === '') {
    dispatch({type: GET_PRODUCTS_IN_CART, payload: productsInCart});
  } else {
    return axios.get(`${BACK_ROUTE}/orders/search/user/${idUser}`)
        .then((res) => {
          const test = res.data.find((el) => el.status === 'Created') || [];
          const products = test.products.map((el) => {
            return {
              image: el.picture,
              name: el.name,
              amount: el.productxorder.amount ? el.productxorder.amount : 1,
              price: el.priceDiscount ? parseFloat(el.priceDiscount).toFixed(2) : parseFloat(el.price).toFixed(2),
              id: el.id,
              priceDiscount: el.priceDiscount,
              discount: el.discount,
              categories: el.categories,
              stock: el.stock,
              idOrder: test.id,
            };
          });
          localStorage.setItem('cart', JSON.stringify(products));
          return dispatch({
            type: GET_PRODUCTS_IN_CART,
            payload: products,
          });
        })
        .catch((err) => console.error(err));
  }
};

export const addProductInCart = (product, userId = '', address) => (dispatch) => {
  const productsInCart = JSON.parse(localStorage
      .getItem('cart') || '[]').concat(product);
  localStorage.setItem('cart', JSON.stringify(productsInCart));
  if (userId === '') {
    dispatch({type: ADD_PRODUCT_IN_CART, payload: product});
  } else {
    dispatch({type: ADD_PRODUCT_IN_CART, payload: product});
    return axios.post(`${BACK_ROUTE}/orders/${userId}/cart`, {
      id: product.id,
      price: product.price,
      address: address,
    })
        .catch((err) => {
          console.error(err);
          // error string for error handling
          return 'error';
        });
  }
};


export const deleteAllCart = (userId = '') => (dispatch) => {
  localStorage.removeItem('cart');
  if (userId === '') {
    dispatch({type: DELETE_ALL_CART});
  } else {
    return axios.delete(`${BACK_ROUTE}/orders/${userId}/cart`)
        .then((res) => dispatch({type: DELETE_ALL_CART}))
        .catch((err) => console.error(err));
  }
};

export const deleteProductFromCart =
  (id, idOrder, userId = '', token) => (dispatch) => {
    const productsInCart = JSON
        .parse(localStorage
            .getItem('cart') || '[]').filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(productsInCart));
    if (userId === '') {
      dispatch({type: DELETE_PRODUCT_FROM_CART, payload: id});
    } else {
      return axios.delete(`${BACK_ROUTE}/orders/orderdelete/${idOrder}/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token,
        },
      })
          .then(() => dispatch({type: DELETE_PRODUCT_FROM_CART, payload: id}))
          .catch((err) => console.error(err));
    }
  };

export const changeProductQuantity = (userId:string = '', id, amount:number,
    totalPrice:number, stock:number) => (dispatch) => {
  if (amount < stock - 1) {
    const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]')
        .map((product) => {
          if (product.id === id) return {...product, amount: amount};
          return product;
        });
    localStorage.setItem('cart', JSON.stringify(productsInCart));
    if (userId === '') {
      dispatch({
        type: CHANGE_PRODUCT_QUANTITY,
        payload: {id, amount, totalPrice},
      });
    } else {
      return axios.post(`${BACK_ROUTE}/orders/${userId}/c/cart`,
          [{id, amount, total_price: totalPrice}])
          .then(() =>
            dispatch({
              type: CHANGE_PRODUCT_QUANTITY,
              payload: {id, amount, totalPrice},
            }))
          .catch((err) => console.error(err));
    }
  };
};

export const goToCheckout = (products) => (dispatch) => {
  return axios.post(`${BACK_ROUTE}/checkout`, {products})
      .then((res) => {
        window.location = res.data.init_point;
      })
      .catch((err) => console.error(err));
};

export const getCheckoutTicket =
  (name, lastName, email, status) => (dispatch) => {
    const products = JSON.parse(localStorage.getItem('cart'));
    const totalPrice = products
        .reduce((acc, {price, amount}) => acc + price * amount, 0);
    const userId = JSON.parse(localStorage.getItem('user')).id;
    if (status === 'pending' || status === 'approved') {
      return axios.post(`${BACK_ROUTE}/orders/sendorder/${name}/${lastName}/${email}`, {totalPrice})
      // Acá agregar el resto.
          .then(() => {
            const promises = products.map((product) => {
              return axios.put(`${BACK_ROUTE}/product/stock/${product.id}`, {product: {...product, stock: product.stock - product.amount, amount: 0}})
                  .then((res) => console.log(res.data))
                  .catch((err) => console.error(err));
            });
            Promise.all(promises)
                .then(() => {
                  return axios.post(`${BACK_ROUTE}/orders/${userId}/update/cart`, {status: 'Complete'})
                      .then(() => {
                        dispatch({type: DELETE_ALL_CART});
                        localStorage.removeItem('cart');
                      })
                      .catch((err) => console.error(err));
                })
                .catch((err) => console.error(err));
          })
          .catch((err) => console.error(err));
    } else {
      return axios.post(`${BACK_ROUTE}/orders/${userId}/update/cart`, {status})
          .then(() => {
            dispatch({type: DELETE_ALL_CART});
            localStorage.removeItem('cart');
          })
          .catch((err) => console.error(err));
    };
  };

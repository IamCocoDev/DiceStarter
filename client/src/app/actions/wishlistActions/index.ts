import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';

export const GET_PRODUCTS_IN_WISHLIST = 'GET_PRODUCTS_IN_WISHLIST';
export const ADD_PRODUCT_IN_WISHLIST = 'ADD_PRODUCT_IN_WISHLIST';
export const DELETE_ALL_WISHLIST = 'DELETE_ALL_WISHLIST';
export const DELETE_PRODUCT_FROM_WISHLIST = 'DELETE_PRODUCT_FROM_WISHLIST';


export const getProductsInWishlist = (idUser = '') => (dispatch) => {
  return axios.get(`${BACK_ROUTE}/wishlist/${idUser}`)
      .then((res) => {
        const products = res.data.map((el) => {
          return {
            image: el.picture,
            name: el.name,
            price: parseFloat(el.price),
            id: el.id,
            stock: el.stock,
            priceDiscount: el.priceDiscount,
            discount: el.discount,
            categories: el.categories,
            rating: el.rating,
          };
        });
        localStorage.setItem('wishlist', JSON.stringify(products));
        return dispatch({
          type: GET_PRODUCTS_IN_WISHLIST,
          payload: products,
        });
      })
      .catch((err) => console.error(err));
};

export const addProductInWishlist = (product, userId = '') => (dispatch) => {
  const productsInWishlist = JSON.parse(localStorage
      .getItem('wishlist') || '[]').concat(product);
  const products = productsInWishlist.map((p) => p.id);
  localStorage.setItem('wishlist', JSON.stringify(productsInWishlist));
  dispatch({
    type: ADD_PRODUCT_IN_WISHLIST,
    payload: product});
  axios.post(`${BACK_ROUTE}/wishlist`, {
    user: userId,
    products: products,
  }).catch((err) => {
    console.error(err);
  });
};

export const deleteProductInWishlist = (id, userId= '') => (dispatch) => {
  const productsInWishlist = JSON
      .parse(localStorage
          .getItem('wishlist') || '[]').filter((product) => product.id !== id);
  const products = productsInWishlist.map((p) => p.id);
  axios.post(`${BACK_ROUTE}/wishlist`, {
    user: userId,
    products: products,
  }).catch((err) => {
    console.error(err);
  });
  localStorage.setItem('wishlist', JSON.stringify(productsInWishlist));
  dispatch({
    type: DELETE_PRODUCT_FROM_WISHLIST,
    payload: id,
  });
};

export const deleteAllLocalWishlist = () => (dispatch) => {
  dispatch({type: DELETE_ALL_WISHLIST});
};

export const deleteAllWishlist = (userId = '') => (dispatch) => {
  localStorage.removeItem('wishlist');
  if (userId === '') {
    dispatch({type: DELETE_ALL_WISHLIST});
  } else {
    return axios.delete(`${BACK_ROUTE}/wishlist/${userId}`)
        .then((res) => dispatch({type: DELETE_ALL_WISHLIST}))
        .catch((err) => console.error(err));
  }
};

import axios from 'axios';
import {BACK_ROUTE} from '../../../ROUTE.js';

export const GET_PRODUCTS_IN_WISHLIST = 'GET_PRODUCTS_IN_WISHLIST';
export const ADD_PRODUCT_IN_WISHLIST = 'ADD_PRODUCT_IN_WISHLIST';
export const DELETE_ALL_WISHLIST = 'DELETE_ALL_WISHLIST';


export const getProductsInWishlist = (idUser = '') => (dispatch) => {
  const productsInWishlist =
  JSON.parse(localStorage.getItem('wishlist') || '[]');
  if (productsInWishlist.length > 0) {
    console.log(productsInWishlist);
    return dispatch({type: GET_PRODUCTS_IN_WISHLIST,
      payload: productsInWishlist});
  } else {
    return axios.get(`${BACK_ROUTE}/wishlist/${idUser}`)
        .then((res) => {
          const products = res.data.map((el) => {
            return {
              image: el.picture,
              name: el.name,
              amount: el.productxorder.amount ? el.productxorder.amount : 1,
              price: parseFloat(el.price),
              id: el.id,
              stock: el.stock,
            };
          });
          localStorage.setItem('wishlist', JSON.stringify(products));
          console.log(products);
          return dispatch({
            type: GET_PRODUCTS_IN_WISHLIST,
            payload: products,
          });
        })
        .catch((err) => console.error(err));
  }
};

export const addProductInWishlist = (product, userId = '') => (dispatch) => {
  if (userId === '') {
    dispatch({type: ADD_PRODUCT_IN_WISHLIST, payload: product});
  } else {
    dispatch({type: ADD_PRODUCT_IN_WISHLIST, payload: product});
  };
};

export const saveWishlist = (userId = '') => (dispatch) => {
  const productsInWishlist = JSON.parse(localStorage
      .getItem('wishlist') || '[]');
  localStorage.setItem('wishlist', JSON.stringify(productsInWishlist));
  return axios.post(`${BACK_ROUTE}/wishlist`, {
    user: userId,
    products: productsInWishlist,
  }).catch((err) => {
    console.error(err);
    // error string for error handling
    return 'error';
  });
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

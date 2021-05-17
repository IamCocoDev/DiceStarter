import axios from 'axios';

export const GET_PRODUCTS_IN_CART = 'GET_PRODUCTS_IN_CART';
export const ADD_PRODUCT_IN_CART = 'ADD_PRODUCT_IN_CART';
export const DELETE_ALL_CART = 'DELETE_ALL_CART';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY';

export const getProductsInCart = () => (dispatch) => {
  const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]');
  dispatch({type: GET_PRODUCTS_IN_CART, payload: productsInCart});
  return;
  /* return axios.get(`http://localhost:3001/`)
      .then((res) => dispatch({type: GET_PRODUCTS_IN_CART, payload: res.data}))
      .catch((err) => console.error(err)); */
};

export const addProductInCart = (product) => (dispatch) => {
  const productsInCart = JSON.parse(localStorage
      .getItem('cart') || '[]').concat(product);
  localStorage.setItem('cart', JSON.stringify(productsInCart));
  dispatch({type: ADD_PRODUCT_IN_CART, payload: product});
  return;
  /* return axios.post(`http://localhost:3001/orders/${userId}/cart`, {product})
      .then((res) =>
        dispatch({type: ADD_PRODUCT_IN_CART, payload: res.data}))
      .catch((err) => console.error(err)); */
};

export const deleteAllCart = (userId) => (dispatch) => {
  if (!userId) {
    localStorage.removeItem('cart');
    dispatch({type: DELETE_ALL_CART});
    return;
  };
  return axios.delete(`http://54.232.68.2:3001/orders/orderdelete/${userId}`)
      .then((res) => dispatch({type: DELETE_ALL_CART}))
      .catch((err) => console.error(err));
};

export const deleteProductFromCart = (id) => (dispatch) => {
  /* if (!userId) { */
  const productsInCart = JSON
      .parse(localStorage
          .getItem('cart') || '[]').filter((product) => product.id !== id);
  localStorage.setItem('cart', JSON.stringify(productsInCart));
  dispatch({type: DELETE_PRODUCT_FROM_CART, payload: id});
  return;
  /* };
  return axios.delete('http://localhost:3001/orders/')
      .then(() => dispatch({type: DELETE_PRODUCT_FROM_CART, payload: id}))
      .catch((err) => console.error(err)); */
};

export const changeProductQuantity = (userId, id, amount,
    totalPrice, stock) => (dispatch) => {
  if (amount < stock - 1) {
    if (!userId) {
      const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]')
          .map((product) => {
            if (product.id === id) return {...product, amount: amount};
            return product;
          });
      localStorage.setItem('cart', JSON.stringify(productsInCart));
      dispatch({type: CHANGE_PRODUCT_QUANTITY,
        payload: {id, amount, totalPrice}});
      return;
    };
    return axios.put(`http://54.232.68.2:3001/orders/${userId}/c/cart`, {id, amount})
        .then(() =>
          dispatch({type: CHANGE_PRODUCT_QUANTITY, payload: {id, amount}}))
        .catch((err) => console.error(err));
  };
};


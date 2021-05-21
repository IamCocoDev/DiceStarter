import axios from 'axios';

export const GET_PRODUCTS_IN_CART = 'GET_PRODUCTS_IN_CART';
export const ADD_PRODUCT_IN_CART = 'ADD_PRODUCT_IN_CART';
export const DELETE_ALL_CART = 'DELETE_ALL_CART';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';
export const CHANGE_PRODUCT_QUANTITY = 'CHANGE_PRODUCT_QUANTITY';

export const getProductsInCart = (idUser = '') => (dispatch) => {
  const productsInCart = JSON.parse(localStorage.getItem('cart') || '[]');

  if (idUser === '') {
    console.log('entro aca');
    dispatch({type: GET_PRODUCTS_IN_CART, payload: productsInCart});
  } else {
    return axios.get(`http://localhost:3001/orders/search/user/${idUser}`)
        .then((res) => {
          console.log(res.data[0].id);
          const products = res.data[0].products.map((el) => {
            return {
              image: el.picture,
              name: el.name,
              amount: el.productxorder.amount ? el.productxorder.amount : 1,
              price: parseFloat(el.price),
              id: el.id,
              stock: el.stock,
              idOrder: res.data[0].id,
            };
          });
          console.log(products);
          return dispatch({
            type: GET_PRODUCTS_IN_CART,
            payload: products,
          });
        })
        .catch((err) => console.error(err));
  }
};

export const addProductInCart = (product, userId = '') => (dispatch) => {
  const productsInCart = JSON.parse(localStorage
      .getItem('cart') || '[]').concat(product);
  localStorage.setItem('cart', JSON.stringify(productsInCart));
  if (userId === '') {
    dispatch({type: ADD_PRODUCT_IN_CART, payload: product});
  } else {
    dispatch({type: ADD_PRODUCT_IN_CART, payload: product});
    return axios.post(`http://localhost:3001/orders/${userId}/cart`, {
      id: product.id,
      price: product.price,
      address: 'cordoba',
    })
        .catch((err) => console.error(err));
  }
};


export const deleteAllCart = (userId = '') => (dispatch) => {
  localStorage.removeItem('cart');
  if (userId === '') {
    dispatch({type: DELETE_ALL_CART});
  } else {
    return axios.delete(`http://localhost:3001/orders/${userId}/cart`)
        .then((res) => dispatch({type: DELETE_ALL_CART}))
        .catch((err) => console.error(err));
  }
};

export const deleteProductFromCart =
  (id, idOrder, userId = '') => (dispatch) => {
    const productsInCart = JSON
        .parse(localStorage
            .getItem('cart') || '[]').filter((product) => product.id !== id);
    localStorage.setItem('cart', JSON.stringify(productsInCart));
    if (userId === '') {
      dispatch({type: DELETE_PRODUCT_FROM_CART, payload: id});
    } else {
      return axios.delete(`http://localhost:3001/orders/orderdelete/${idOrder}/${id}`)
          .then(() => dispatch({type: DELETE_PRODUCT_FROM_CART, payload: id}))
          .catch((err) => console.error(err));
    }
  };

export const changeProductQuantity = (userId:string = '', id, amount:number,
    totalPrice:number, stock:number) => (dispatch) => {
  console.log(userId);
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
      return axios.post(`http://localhost:3001/orders/${userId}/c/cart`, [{id, amount, total_price: totalPrice}])
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
  return axios.post('http://localhost:3001/checkout', {products})
      .then((res) => {
        window.location = res.data.init_point;
      })
      .catch((err) => console.error(err));
};

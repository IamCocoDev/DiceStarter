import {ADD_PRODUCT_IN_CART,
  DELETE_ALL_CART,
  GET_PRODUCTS_IN_CART,
  DELETE_PRODUCT_FROM_CART,
  CHANGE_PRODUCT_QUANTITY,
} from '../actions/cartActions';
import {RootState} from '../store';
import {cartState} from '../../types';

const initialState : cartState = {
  productsInCart: JSON.parse(localStorage.getItem('cart') || '[]'),
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_IN_CART:
      return {
        ...state,
        productsInCart: action.payload,
      };
    case ADD_PRODUCT_IN_CART:
      return {
        ...state,
        productsInCart: state.productsInCart.concat(action.payload),
      };
    case DELETE_ALL_CART:
      return {
        ...state,
        productsInCart: [],
      };
    case DELETE_PRODUCT_FROM_CART:
      return {
        ...state,
        productsInCart: state.productsInCart
            .filter((product) => product.id !== action.payload),
      };
    case CHANGE_PRODUCT_QUANTITY:
      const {id, amount} = action.payload;
      return {
        ...state,
        productsInCart: state.productsInCart.map((product) => {
          if (product.id === id) return {...product, amount};
          return product;
        }),
      };
    default:
      return state;
  };
};

export default cartReducer;

export const cartsReducer = (state: RootState) =>
  state.handleCart.productsInCart;

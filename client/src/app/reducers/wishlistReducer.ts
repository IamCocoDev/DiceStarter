import {ADD_PRODUCT_IN_WISHLIST,
  DELETE_ALL_WISHLIST,
  GET_PRODUCTS_IN_WISHLIST,
} from '../actions/wishlistActions';
import {RootState} from '../store';
import {wishlistState} from '../../types';

const initialState : wishlistState = {
  productsInWishlist: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_IN_WISHLIST:
      return {
        ...state,
        productsInWishlist: action.payload,
      };
    case ADD_PRODUCT_IN_WISHLIST:
      return {
        ...state,
        productsInWishlist: state.productsInWishlist.concat(action.payload),
      };
    case DELETE_ALL_WISHLIST:
      return {
        ...state,
        productsInWishlist: [],
      };
    default:
      return state;
  };
};

export default wishlistReducer;

export const wishlistsReducer = (state: RootState) =>
  state.handleWishlist.productsInWishlist;

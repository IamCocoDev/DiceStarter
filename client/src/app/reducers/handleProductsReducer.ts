// Actions
import {
  SET_PRODUCTS,
  SET_PRODUCT_BY_ID,
  SET_CATEGORIES,
} from '../constants/constants';
// Types
import {Products} from '../../types';
import {RootState} from '../store';

const initialState: Products = {/* Acá definanse un Type en types.ts*/
  // Data
  productsList: null,
  productById: null,
  productCategories: [{label: '', value: ''}],
  totalPages: 0,
  queryFilter: '',
  querySort: '',
  queryName: '',
};

const handleProductsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // GET PRODUCTS
    case SET_PRODUCTS:
      return {
        ...state,
        productsList: action.payload.products,
        totalPages: action.payload.totalPages,
        queryFilter: action.payload.filter,
        querySort: action.payload.order,
        queryName: action.payload.name,
      };
    // GET PRODUCT DETAIL
    case SET_PRODUCT_BY_ID:
      return {
        ...state,
        productById: action.payload,
      };
    // GET CATEGORIES
    case SET_CATEGORIES:
      return {
        ...state,
        productCategories: action.payload,
      };
    // ADD CATEGORY
    default:
      return state;
  }
};

export default handleProductsReducer;

export const productsList = (state: RootState) =>
  state.handleProducts.productsList;
export const productDetail = (state: RootState) =>
  state.handleProducts.productById;
export const productCategories = (state: RootState) =>
  state.handleProducts.productCategories;
export const totalPages = (state: RootState) =>
  state.handleProducts.totalPages;
export const queryFilter = (state: RootState) =>
  state.handleProducts.queryFilter;
export const querySort = (state: RootState) =>
  state.handleProducts.querySort;
export const queryName = (state: RootState) =>
  state.handleProducts.queryName;

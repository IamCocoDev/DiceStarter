// Actions
import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_FAILED,
  FETCH_PRODUCTS_SUCCESS,
  SET_PRODUCTS,
  FETCH_PRODUCT_BY_ID_BEGIN,
  FETCH_PRODUCT_BY_ID_FAILED,
  FETCH_PRODUCT_BY_ID_SUCCESS,
  SET_PRODUCT_BY_ID,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  GET_CATEGORIES_BEGIN,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILED,
  ADD_CATEGORY_BEGIN,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  SET_CATEGORIES,
} from '../actions/handleProductsActions/index';
// Types
import {Products} from '../../types';
import {RootState} from '../store';

const initialState: Products = {/* Acá definanse un Type en types.ts*/
  // Status
  productsListStatus: 'idle',
  deleteByIdStatus: 'idle',
  productByIdStatus: 'idle',
  getCategoriesStatus: 'idle',
  addCategoryStatus: 'idle',
  // Data
  productsList: null,
  productById: {
    id: '',
    name: '',
    picture: '',
    price: '',
    size: '',
    color: [],
    available: true,
    stock: '',
    description: '',
    rating: '',
    categories: [],
  },
  productCategories: [{label: '', value: 0}],
  totalPages: 0,
  queryFilter: '',
  querySort: '',
  queryName: '',
};

const handleProductsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    // GET PRODUCTS
    case FETCH_PRODUCTS_BEGIN:
      return {
        ...state,
        productsListStatus: 'loading',
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        productsListStatus: 'idle',
      };
    case FETCH_PRODUCTS_FAILED:
      return {
        ...state,
        productsListStatus: 'failed',
      };
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
    case FETCH_PRODUCT_BY_ID_BEGIN:
      return {
        ...state,
        productByIdStatus: 'loading',
      };
    case FETCH_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        productByIdStatus: 'idle',
      };
    case FETCH_PRODUCT_BY_ID_FAILED:
      return {
        ...state,
        productByIdStatus: 'failed',
      };
    case SET_PRODUCT_BY_ID:
      return {
        ...state,
        productById: action.payload,
      };
    // DELETE PRODUCT BY ID
    case DELETE_PRODUCT_BEGIN:
      return {
        ...state,
        deleteByIdStatus: 'loading',
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteByIdStatus: 'deleted',
      };
    case DELETE_PRODUCT_BEGIN:
      return {
        ...state,
        deleteByIdStatus: 'failed',
      };
    // GET CATEGORIES
    case GET_CATEGORIES_BEGIN:
      return {
        ...state,
        getCategoriesStatus: 'loading',
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        getCategoriesStatus: 'idle',
      };
    case GET_CATEGORIES_FAILED:
      return {
        ...state,
        getCategoriesStatus: 'failed',
      };
    case SET_CATEGORIES:
      return {
        ...state,
        productCategories: action.payload,
      };
    // ADD CATEGORY
    case ADD_CATEGORY_BEGIN:
      return {
        ...state,
        addCategoryStatus: 'loading',
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        addCategoryStatus: 'idle',
      };
    case ADD_CATEGORY_FAILED:
      return {
        ...state,
        addCategoryStatus: 'failed',
      };
    default:
      return state;
  }
};

export default handleProductsReducer;

export const productsListStatus = (state: RootState) =>
  state.handleProducts.productsListStatus;
export const deletedProductStatus = (state: RootState) =>
  state.handleProducts.deleteByIdStatus;
export const productByIdStatus = (state: RootState) =>
  state.handleProducts.productByIdStatus;
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

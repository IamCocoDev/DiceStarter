import axios from 'axios';
import {ProductRes, SearchInput} from '../../../types';

// Data setters
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_PRODUCT_BY_ID = 'SET_PRODUCT_BY_ID';
export const SET_CATEGORIES = 'SET_CATEGORIES';

// Status setters
// Products
export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';
// Product detail
export const FETCH_PRODUCT_BY_ID_BEGIN = 'FETCH_PRODUCT_BY_ID_BEGIN';
export const FETCH_PRODUCT_BY_ID_SUCCESS = 'FETCH_PRODUCT_BY_ID_SUCCESS';
export const FETCH_PRODUCT_BY_ID_FAILED = 'FETCH_PRODUCT_BY_ID_FAILED';
// Delete product
export const RESET_DELETED_BY_ID_STATUS = 'RESET_DELETED_BY_ID_STATUS';
export const DELETE_PRODUCT_BEGIN = 'DELETE_PRODUCT_BEGIN';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAILED = 'DELETE_PRODUCT_FAILED';
// Change product in DB
export const CHANGE_PRODUCTS_IN_DB_BEGIN = 'CHANGE_PRODUCTS_IN_DB_BEGIN';
export const CHANGE_PRODUCTS_IN_DB_SUCCESS = 'CHANGE_PRODUCTS_IN_DB_SUCCESS';
export const CHANGE_PRODUCTS_IN_DB_FAILED = 'CHANGE_PRODUCTS_IN_DB_FAILED';
// Get categories from DB
export const GET_CATEGORIES_BEGIN = 'GET_CATEGORIES_BEGIN';
export const GET_CATEGORIES_SUCCESS = 'GET_CATEGORIES_SUCCESS';
export const GET_CATEGORIES_FAILED = 'GET_CATEGORIES_FAILED';
// Get categories from DB
export const ADD_CATEGORY_BEGIN = 'ADD_CATEGORY_BEGIN';
export const ADD_CATEGORY_SUCCESS = 'ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILED = 'ADD_CATEGORY_FAILED';

// Status handlers and local setters
const fetchProductsBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});
const fetchProductsSuccess = () => ({
  type: FETCH_PRODUCTS_SUCCESS,
});
const fetchProductsFailed = (error: any) => ({
  type: FETCH_PRODUCTS_FAILED,
  payload: {error},
});
const setProducts = (products: any,
    totalPages: number, filter: string, order: string, name:string) => ({
  type: SET_PRODUCTS,
  payload: {products, totalPages, filter, order, name},
});

// PRODUCT BY ID HANDLING
const fetchProductByIdBegin = () => ({
  type: FETCH_PRODUCT_BY_ID_BEGIN,
});
const fetchProductByIdSuccess = () => ({
  type: FETCH_PRODUCT_BY_ID_SUCCESS,
});
const fetchProductByIdFailed = (error: any) => ({
  type: FETCH_PRODUCT_BY_ID_FAILED,
  payload: {error},
});
const setProductById = (productResponse: any) => ({
  type: SET_PRODUCT_BY_ID,
  payload: productResponse,
});

// DELETE PRODUCT BY ID
const deleteProductBegin = () => ({
  type: FETCH_PRODUCTS_BEGIN,
});
const deleteProductSuccess = () => ({
  type: FETCH_PRODUCTS_SUCCESS,
});
const deleteProductFailed = (error: any) => ({
  type: FETCH_PRODUCTS_FAILED,
  payload: {error},
});
const resetDeletedByIdStatus = () => ({
  type: RESET_DELETED_BY_ID_STATUS,
});

// PUT PRODUCT TO DB
const changeProductInDbBegin = () => ({
  type: CHANGE_PRODUCTS_IN_DB_BEGIN,
});
const changeProductInDbSuccess = () => ({
  type: CHANGE_PRODUCTS_IN_DB_SUCCESS,
});
const changeProductInDbFailed = (error: any) => ({
  type: CHANGE_PRODUCTS_IN_DB_FAILED,
  payload: {error},
});

// GET CATEGORIES
const getCategoriesBegin = () => ({
  type: GET_CATEGORIES_BEGIN,
});
const getCategoriesSuccess = () => ({
  type: GET_CATEGORIES_SUCCESS,
});
const getCategoriesFailed = (error: any) => ({
  type: GET_CATEGORIES_FAILED,
  payload: {error},
});
const setCategories = (categories: any) => ({
  type: SET_CATEGORIES,
  payload: categories,
});

// ADD CATEGORY ASYNC
const addCategoryBegin = () => ({
  type: ADD_CATEGORY_BEGIN,
});
const addCategorySuccess = () => ({
  type: ADD_CATEGORY_SUCCESS,
});
const addCategoryFailed = (error: any) => ({
  type: ADD_CATEGORY_FAILED,
  payload: {error},
});


// Actual async functions
const getProductsAsync = (SearchInput: SearchInput) => {
  return async (dispatch: any) => {
    dispatch(fetchProductsBegin());
    try {
      const res = await axios.get(`http://localhost:3001/products?page=${SearchInput.page}&name=${SearchInput.name}&filter=${SearchInput.filter || ''}&order=${SearchInput.sort || ''}`);
      const totalPages = res.data.totalPages;
      const products = res.data.products.map((product: ProductRes) => {
        return {
          id: product.id,
          name: product.name,
          picture: product.picture,
          price: product.price,
          rating: product.rating,
          size: product.size,
          stock: product.stock,
          categories: product.categories,
          color: product.color,
          available: product.available,
          description: product.description,
        };
      });
      dispatch(setProducts(products,
          totalPages, SearchInput.filter, SearchInput.sort, SearchInput.name));
      dispatch(fetchProductsSuccess());
    } catch (err) {
      dispatch(fetchProductsFailed(err));
    }
  };
};
const getProductByIdAsync = (id: any) => {
  return async (dispatch: any) => {
    dispatch(fetchProductByIdBegin());
    try {
      const res = await axios.get(`http://localhost:3001/product/${id}`);
      const {name,
        picture,
        price,
        stock,
        color,
        size,
        available,
        description,
        rating,
        categories,
      } = res.data;
      const productResponse: ProductRes = {
        id,
        name,
        picture,
        price,
        stock,
        color,
        available,
        description,
        size,
        rating,
        categories,
      };
      dispatch(setProductById(productResponse));
      dispatch(fetchProductByIdSuccess());
    } catch (err) {
      dispatch(fetchProductByIdFailed(err));
    }
  };
};
const deleteProductByIdAsync = (id: any) => {
  return async (dispatch: any) => {
    dispatch(deleteProductBegin());
    try {
      await axios.delete(`http://localhost:3001/product/${id}`);
      dispatch(getProductsAsync({name: '', page: 1}));
      dispatch(deleteProductSuccess());
    } catch (err) {
      dispatch(deleteProductFailed(err));
    }
  };
};
const changeProductInDBAsync = (product: any) => {
  return async (dispatch: any) => {
    dispatch(changeProductInDbBegin());
    try {
      const toSend = {
        id: product.id,
        name: product.name,
        available: product.available,
        categories: product.categories,
        color: product.color,
        description: product.description,
        picture: product.picture,
        price: product.price,
        rating: product.rating,
        size: product.size,
        stock: product.stock,
      };
      await axios.put(`http://localhost:3001/product/${product.id}`, toSend);
      dispatch(changeProductInDbSuccess());
    } catch (err) {
      dispatch(changeProductInDbFailed(err));
    }
  };
};
const getCategoriesAsync = () => {
  return async (dispatch: any) => {
    dispatch(getCategoriesBegin());
    try {
      const res = await axios.get(`http://localhost:3001/categories`);
      const categories = res.data.map((
          category: any) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
      console.log('GetCategoriesAsync', categories);
      dispatch(setCategories(categories));
      dispatch(getCategoriesSuccess());
    } catch (err) {
      dispatch(getCategoriesFailed(err));
    }
  };
};
const addCategoryAsync = (label: string) => {
  return async (dispatch: any) => {
    dispatch(addCategoryBegin());
    try {
      const name = label;
      await axios.post('http://localhost:3001/categories', {name});
      dispatch(addCategorySuccess());
    } catch (err) {
      dispatch(addCategoryFailed(err));
    }
  };
};

export {
  resetDeletedByIdStatus,
  getProductsAsync,
  getProductByIdAsync,
  deleteProductByIdAsync,
  changeProductInDBAsync,
  getCategoriesAsync,
  addCategoryAsync,
};
